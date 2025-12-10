import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component, Fragment } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import 'shared/custom-els/loading-spinner';
import prettyBytes from './pretty-bytes';
import { Arrow, DownloadIcon } from 'client/lazy-app/icons';
const loadingReactionDelay = 500;
export default class Results extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showLoadingState: this.props.loading,
        };
        /** The timeout ID between entering the loading state, and changing UI */
        this.loadingTimeoutId = 0;
        this.onDownload = () => {
            // GA can’t do floats. So we round to ints. We're deliberately rounding to nearest kilobyte to
            // avoid cases where exact image sizes leak something interesting about the user.
            const before = Math.round(this.props.source.file.size / 1024);
            const after = Math.round(this.props.imageFile.size / 1024);
            const change = Math.round((after / before) * 1000);
            ga('send', 'event', 'compression', 'download', {
                metric1: before,
                metric2: after,
                metric3: change,
            });
        };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.loading && !this.props.loading) {
            // Just stopped loading
            clearTimeout(this.loadingTimeoutId);
            this.setState({ showLoadingState: false });
        }
        else if (!prevProps.loading && this.props.loading) {
            // Just started loading
            this.loadingTimeoutId = self.setTimeout(() => this.setState({ showLoadingState: true }), loadingReactionDelay);
        }
    }
    render({ source, imageFile, downloadUrl, flipSide, typeLabel }, { showLoadingState }) {
        const prettySize = imageFile && prettyBytes(imageFile.size);
        const isOriginal = !source || !imageFile || source.file === imageFile;
        let diff;
        let percent;
        if (source && imageFile) {
            diff = imageFile.size / source.file.size;
            const absolutePercent = Math.round(Math.abs(diff) * 100);
            percent = diff > 1 ? absolutePercent - 100 : 100 - absolutePercent;
        }
        return (_jsxs("div", { class: (flipSide ? style.resultsRight : style.resultsLeft) +
                ' ' +
                (isOriginal ? style.isOriginal : ''), children: [_jsx("div", { class: style.expandArrow, children: _jsx(Arrow, {}) }), _jsx("div", { class: style.bubble, children: _jsxs("div", { class: style.bubbleInner, children: [_jsx("div", { class: style.sizeInfo, children: _jsx("div", { class: style.fileSize, children: prettySize ? (_jsxs(Fragment, { children: [prettySize.value, ' ', _jsx("span", { class: style.unit, children: prettySize.unit }), _jsxs("span", { class: style.typeLabel, children: [" ", typeLabel] })] })) : ('…') }) }), _jsxs("div", { class: style.percentInfo, children: [_jsx("svg", { viewBox: "0 0 1 2", class: style.bigArrow, preserveAspectRatio: "none", children: _jsx("path", { d: "M1 0v2L0 1z" }) }), _jsxs("div", { class: style.percentOutput, children: [diff && diff !== 1 && (_jsx("span", { class: style.sizeDirection, children: diff < 1 ? '↓' : '↑' })), _jsx("span", { class: style.sizeValue, children: percent || 0 }), _jsx("span", { class: style.percentChar, children: "%" })] })] })] }) }), _jsxs("a", { class: showLoadingState ? style.downloadDisable : style.download, href: downloadUrl, download: imageFile ? imageFile.name : '', title: "Download", onClick: this.onDownload, children: [_jsxs("svg", { class: style.downloadBlobs, viewBox: "0 0 89.6 86.9", children: [_jsx("title", { children: "Download" }), _jsx("path", { d: "M27.3 72c-8-4-15.6-12.3-16.9-21-1.2-8.7 4-17.8 10.5-26s14.4-15.6 24-16 21.2 6 28.6 16.5c7.4 10.5 10.8 25 6.6 34S64.1 71.8 54 73.6c-10.2 2-18.7 2.3-26.7-1.6z" }), _jsx("path", { d: "M19.8 24.8c4.3-7.8 13-15 21.8-15.7 8.7-.8 17.5 4.8 25.4 11.8 7.8 6.9 14.8 15.2 14.7 24.9s-7.1 20.7-18 27.6c-10.8 6.8-25.5 9.5-34.2 4.8S18.1 61.6 16.7 51.4c-1.3-10.3-1.3-18.8 3-26.6z" })] }), _jsx("div", { class: style.downloadIcon, children: _jsx(DownloadIcon, {}) }), showLoadingState && _jsx("loading-spinner", {})] })] }));
    }
}
