/**
 * Copyright 2020 Google
 * Licensed under the Apache License, Version 2.0
 */
import { h } from 'preact';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sizeOf from 'image-size';

import { renderPage, writeFiles } from './utils';
import IndexPage from './pages/index';

import dedent from 'dedent';
import { lookup as lookupMime } from 'mime-types';

// @ts-ignore - runtime type check
function getImageSize(urlObj: URL | string) {
  let realPath;
  if (typeof urlObj === 'string') {
    if (urlObj.startsWith('/c/')) {
      realPath = path.join(process.cwd(), '.tmp', 'build', 'static', urlObj.substring(1));
    } else {
      realPath = urlObj; // Fallback or absolute path
    }
  } else {
    realPath = fileURLToPath(urlObj);
    if (realPath.startsWith('/c/')) {
      realPath = path.join(process.cwd(), '.tmp', 'build', 'static', realPath.substring(1));
    }
  }
  const buf = fs.readFileSync(realPath);
  return sizeOf(buf);
}

// @ts-ignore
function urlToWebPath(urlObj: URL | string) {
  if (typeof urlObj === 'string') return urlObj;
  const fullPath = fileURLToPath(urlObj);
  if (fullPath.startsWith('/c/')) return fullPath;

  // Handle dev path (.tmp/build/static)
  const tmpStaticIndex = fullPath.indexOf('.tmp/build/static/');
  if (tmpStaticIndex !== -1) {
    return '/' + fullPath.substring(tmpStaticIndex + '.tmp/build/static/'.length);
  }
  // Handle prod path (static/c...) or fallback
  const staticIndex = fullPath.indexOf('static/');
  if (staticIndex !== -1) {
    return '/' + fullPath.substring(staticIndex + 'static/'.length);
  }
  return fullPath;
}

// @ts-ignore
function getPathname(urlObj: URL | string) {
  if (typeof urlObj === 'string') return urlObj;
  return urlObj.pathname;
}

import iconLargeMaskable from 'url:./assets/icon-large-maskable.png';
import iconLarge from 'url:./assets/icon-large.png';
import screenshot1 from 'url:./assets/screenshot1.png';
import screenshot2 from 'url:./assets/screenshot2.jpg';
import screenshot3 from 'url:./assets/screenshot3.jpg';
import screenshot4 from 'url:./assets/screenshot4.png';
import screenshot5 from 'url:./assets/screenshot5.jpg';
import screenshot6 from 'url:./assets/screenshot6.jpg';

const img = {
  iconLargeMaskable,
  iconLarge,
  screenshot1,
  screenshot2,
  screenshot3,
  screenshot4,
  screenshot5,
  screenshot6,
};

interface Dimensions {
  width: number;
  height: number;
}

const manifestSize = ({ width, height }: Dimensions) => `${width}x${height}`;
const formFactor = ({ width, height }: Dimensions) =>
  width > height ? 'wide' : 'narrow';

async function buildScreenshots() {
  const list = [
    img.screenshot1,
    img.screenshot2,
    img.screenshot3,
    img.screenshot4,
    img.screenshot5,
    img.screenshot6,
  ];

  return Promise.all(
    list.map(async (shot) => {
      const dim = getImageSize(shot);
      return {
        src: urlToWebPath(shot),
        type: lookupMime(getPathname(shot)),
        sizes: manifestSize(dim),
        form_factor: formFactor(dim),
        label: `Demo image: ${(lookupMime(getPathname(shot)) || '')
          .split('/')[1]
          .toUpperCase()}`,
      };
    }),
  );
}

async function buildIcons() {
  const large = getImageSize(img.iconLarge);
  const maskable = getImageSize(img.iconLargeMaskable);

  return {
    large: {
      src: urlToWebPath(img.iconLarge),
      type: lookupMime(getPathname(img.iconLarge)),
      sizes: manifestSize(large),
    },
    maskable: {
      src: urlToWebPath(img.iconLargeMaskable),
      type: lookupMime(getPathname(img.iconLargeMaskable)),
      sizes: manifestSize(maskable),
      purpose: 'maskable',
    },
  };
}

async function main() {
  const screenshots = await buildScreenshots();
  const icons = await buildIcons();

  const toOutput = {
    'index.html': renderPage(<IndexPage />),

    'manifest.json': JSON.stringify({
      name: 'Squoosh',
      short_name: 'Squoosh',
      start_url: '/?utm_medium=PWA&utm_source=launcher',
      display: 'standalone',
      orientation: 'any',
      background_color: '#fff',
      theme_color: '#ff3385',

      icons: [icons.large, icons.maskable],

      description:
        'Compress and compare images with different codecs, right in your browser.',
      lang: 'en',
      categories: ['photo', 'productivity', 'utilities'],
      screenshots,

      share_target: {
        action: '/?utm_medium=PWA&utm_source=share-target&share-target',
        method: 'POST',
        enctype: 'multipart/form-data',
        params: {
          files: [
            {
              name: 'file',
              accept: ['image/*'],
            },
          ],
        },
      },
    }),

    _headers: dedent`
      /*
        Cache-Control: no-cache

      # COOP+COEP for WebAssembly threads.
      /*
        Cross-Origin-Embedder-Policy: require-corp
        Cross-Origin-Opener-Policy: same-origin
    `,
  };

  writeFiles(toOutput);
}

main();
