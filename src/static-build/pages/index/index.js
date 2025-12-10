import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import baseCss from 'css:./base.css';
import initialCss from 'initial-css:';
import { allSrc } from 'client-bundle:client/initial-app';
import favicon from 'url:static-build/assets/favicon.ico';
import ogImage from 'url:static-build/assets/icon-large-maskable.png';
import { escapeStyleScriptContent, siteOrigin } from 'static-build/utils';
import Intro from 'shared/prerendered-app/Intro';
import snackbarCss from 'css:../../../shared/custom-els/snack-bar/styles.css';
import * as snackbarStyle from '../../../shared/custom-els/snack-bar/styles.css';
const Index = () => (_jsxs("html", { lang: "en", children: [_jsxs("head", { children: [_jsx("title", { children: "Squoosh" }), _jsx("meta", { name: "description", content: "Squoosh is the ultimate image optimizer that allows you to compress and compare images with different codecs in your browser." }), _jsx("meta", { name: "twitter:card", content: "summary" }), _jsx("meta", { name: "twitter:site", content: "@SquooshApp" }), _jsx("meta", { property: "og:title", content: "Squoosh" }), _jsx("meta", { property: "og:type", content: "website" }), _jsx("meta", { property: "og:image", content: `${siteOrigin}${ogImage}` }), _jsx("meta", { property: "og:image:secure_url", content: `${siteOrigin}${ogImage}` }), _jsx("meta", { property: "og:image:type", content: "image/png" }), _jsx("meta", { property: "og:image:width", content: "500" }), _jsx("meta", { property: "og:image:height", content: "500" }), _jsx("meta", { property: "og:image:alt", content: "A cartoon of a hand squeezing an image file on a dark background." }), _jsx("meta", { name: "og:description", content: "Squoosh is the ultimate image optimizer that allows you to compress and compare images with different codecs in your browser." }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" }), _jsx("meta", { name: "mobile-web-app-capable", content: "yes" }), _jsx("meta", { name: "apple-mobile-web-app-capable", content: "yes" }), _jsx("link", { rel: "shortcut icon", href: favicon }), _jsx("link", { rel: "apple-touch-icon", href: ogImage }), _jsx("meta", { name: "theme-color", content: "#ff3385" }), _jsx("link", { rel: "manifest", href: "/manifest.json" }), _jsx("link", { rel: "canonical", href: siteOrigin }), _jsx("style", { dangerouslySetInnerHTML: { __html: escapeStyleScriptContent(baseCss) } }), _jsx("style", { dangerouslySetInnerHTML: {
                        __html: escapeStyleScriptContent(initialCss),
                    } })] }), _jsxs("body", { children: [_jsxs("div", { id: "app", children: [_jsx(Intro, {}), _jsxs("noscript", { children: [_jsx("style", { dangerouslySetInnerHTML: {
                                        __html: escapeStyleScriptContent(snackbarCss),
                                    } }), _jsx("snack-bar", { children: _jsxs("div", { class: snackbarStyle.snackbar, "aria-live": "assertive", "aria-atomic": "true", "aria-hidden": "false", children: [_jsx("div", { class: snackbarStyle.text, children: "Initialization error: This site requires JavaScript, which is disabled in your browser." }), _jsx("a", { class: snackbarStyle.button, href: "/", children: "reload" })] }) })] })] }), _jsx("script", { dangerouslySetInnerHTML: {
                        __html: escapeStyleScriptContent(allSrc),
                    } })] })] }));
export default Index;
