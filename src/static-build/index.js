import { jsx as _jsx } from "preact/jsx-runtime";
import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import { renderPage, writeFiles } from './utils';
import IndexPage from './pages/index';
import dedent from 'dedent';
import { lookup as lookupMime } from 'mime-types';
/** 이미지 크기 읽기 */
function getImageSize(urlObj) {
    // URL.pathname은 "/static-build/assets/img.png" 같은 형태라 leading "/" 제거 필요
    const realPath = path.resolve(process.cwd(), urlObj.pathname.replace(/^\//, ''));
    const buf = fs.readFileSync(realPath);
    return sizeOf(buf);
}
const img = {
    iconLargeMaskable: new URL('./assets/icon-large-maskable.png', import.meta.url),
    iconLarge: new URL('./assets/icon-large.png', import.meta.url),
    screenshot1: new URL('./assets/screenshot1.png', import.meta.url),
    screenshot2: new URL('./assets/screenshot2.jpg', import.meta.url),
    screenshot3: new URL('./assets/screenshot3.jpg', import.meta.url),
    screenshot4: new URL('./assets/screenshot4.png', import.meta.url),
    screenshot5: new URL('./assets/screenshot5.jpg', import.meta.url),
    screenshot6: new URL('./assets/screenshot6.jpg', import.meta.url),
};
const manifestSize = ({ width, height }) => `${width}x${height}`;
const formFactor = ({ width, height }) => width > height ? 'wide' : 'narrow';
async function buildScreenshots() {
    const list = [
        img.screenshot1,
        img.screenshot2,
        img.screenshot3,
        img.screenshot4,
        img.screenshot5,
        img.screenshot6,
    ];
    return Promise.all(list.map(async (shot) => {
        const dim = getImageSize(shot);
        return {
            src: shot.href,
            type: lookupMime(shot.pathname),
            sizes: manifestSize(dim),
            form_factor: formFactor(dim),
        };
    }));
}
async function buildIcons() {
    const large = getImageSize(img.iconLarge);
    const maskable = getImageSize(img.iconLargeMaskable);
    return {
        large: {
            src: img.iconLarge.href,
            type: lookupMime(img.iconLarge.pathname),
            sizes: manifestSize(large),
        },
        maskable: {
            src: img.iconLargeMaskable.href,
            type: lookupMime(img.iconLargeMaskable.pathname),
            sizes: manifestSize(maskable),
            purpose: 'maskable',
        },
    };
}
async function main() {
    const screenshots = await buildScreenshots();
    const icons = await buildIcons();
    const toOutput = {
        'index.html': renderPage(_jsx(IndexPage, {})),
        'manifest.json': JSON.stringify({
            name: 'Squoosh',
            short_name: 'Squoosh',
            start_url: '/?utm_medium=PWA&utm_source=launcher',
            display: 'standalone',
            orientation: 'any',
            background_color: '#fff',
            theme_color: '#ff3385',
            icons: [icons.large, icons.maskable],
            description: 'Compress and compare images with different codecs, right in your browser.',
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
        _headers: dedent `
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
