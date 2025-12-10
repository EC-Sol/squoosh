import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { defaultOptions } from '../shared/meta';
import { Component } from 'preact';
import { preventDefault, shallowEqual } from 'client/lazy-app/util';
import * as style from 'client/lazy-app/Compress/Options/style.css';
import Checkbox from 'client/lazy-app/Compress/Options/Checkbox';
import Expander from 'client/lazy-app/Compress/Options/Expander';
import Select from 'client/lazy-app/Compress/Options/Select';
import Range from 'client/lazy-app/Compress/Options/Range';
import linkState from 'linkstate';
import Revealer from 'client/lazy-app/Compress/Options/Revealer';
export const encode = (signal, workerBridge, imageData, options) => workerBridge.avifEncode(signal, imageData, options);
/**
 * AVIF quality ranges from 0 (worst) to 100 (lossless).
 * Since lossless is a separate checkbox, we cap user-inputted quality at 99
 *
 * AVIF speed ranges from 0 (slowest) to 10 (fastest).
 * We display it as 'effort' to the user since it conveys the speed-size tradeoff
 * much better: speed = 10 - effort
 */
const MAX_QUALITY = 100;
const MAX_EFFORT = 10;
export class Options extends Component {
    constructor() {
        super(...arguments);
        // The rest of the defaults are set in getDerivedStateFromProps
        this.state = {
            showAdvanced: false,
        };
        this._inputChangeCallbacks = new Map();
        this._inputChange = (prop, type) => {
            // Cache the callback for performance
            if (!this._inputChangeCallbacks.has(prop)) {
                this._inputChangeCallbacks.set(prop, (event) => {
                    const formEl = event.target;
                    const newVal = type === 'boolean'
                        ? 'checked' in formEl
                            ? formEl.checked
                            : !!formEl.value
                        : type === 'number'
                            ? Number(formEl.value)
                            : formEl.value;
                    const newState = {
                        [prop]: newVal,
                    };
                    const optionState = {
                        ...this.state,
                        ...newState,
                    };
                    const newOptions = {
                        quality: optionState.lossless ? MAX_QUALITY : optionState.quality,
                        qualityAlpha: optionState.lossless || !optionState.separateAlpha
                            ? -1 // Set qualityAlpha to quality
                            : optionState.alphaQuality,
                        // Always set to 4:4:4 if lossless
                        subsample: optionState.lossless ? 3 : optionState.subsample,
                        tileColsLog2: optionState.tileCols,
                        tileRowsLog2: optionState.tileRows,
                        speed: MAX_EFFORT - optionState.effort,
                        chromaDeltaQ: optionState.chromaDeltaQ,
                        sharpness: optionState.sharpness,
                        denoiseLevel: optionState.denoiseLevel,
                        tune: optionState.tune,
                        enableSharpYUV: optionState.enableSharpYUV,
                    };
                    // Updating options, so we don't recalculate in getDerivedStateFromProps.
                    newState.options = newOptions;
                    this.setState(
                    // It isn't clear to me why I have to cast this :)
                    newState);
                    this.props.onChange(newOptions);
                });
            }
            return this._inputChangeCallbacks.get(prop);
        };
    }
    static getDerivedStateFromProps(props, state) {
        if (state.options && shallowEqual(state.options, props.options)) {
            return null;
        }
        const { options } = props;
        const lossless = options.quality === MAX_QUALITY &&
            (options.qualityAlpha == -1 || options.qualityAlpha == MAX_QUALITY) &&
            options.subsample == 3;
        const separateAlpha = options.qualityAlpha !== -1;
        // Create default form state from options
        return {
            options,
            lossless,
            quality: lossless ? defaultOptions.quality : options.quality,
            separateAlpha,
            alphaQuality: separateAlpha ? options.qualityAlpha : options.quality,
            subsample: options.subsample,
            tileRows: options.tileRowsLog2,
            tileCols: options.tileColsLog2,
            effort: MAX_EFFORT - options.speed,
            chromaDeltaQ: options.chromaDeltaQ,
            sharpness: options.sharpness,
            denoiseLevel: options.denoiseLevel,
            tune: options.tune,
            enableSharpYUV: options.enableSharpYUV,
        };
    }
    render(_, { effort, lossless, alphaQuality, separateAlpha, quality, showAdvanced, subsample, tileCols, tileRows, chromaDeltaQ, sharpness, denoiseLevel, tune, enableSharpYUV, }) {
        return (_jsxs("form", { class: style.optionsSection, onSubmit: preventDefault, children: [_jsxs("label", { class: style.optionToggle, children: ["Lossless", _jsx(Checkbox, { checked: lossless, onChange: this._inputChange('lossless', 'boolean') })] }), _jsx(Expander, { children: !lossless && (_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: MAX_QUALITY - 1, value: quality, onInput: this._inputChange('quality', 'number'), children: "Quality:" }) })) }), _jsxs("label", { class: style.optionReveal, children: [_jsx(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }), "Advanced settings"] }), _jsx(Expander, { children: showAdvanced && (_jsxs("div", { children: [_jsx(Expander, { children: !lossless && (_jsxs("div", { children: [_jsxs("label", { class: style.optionTextFirst, children: ["Subsample chroma:", _jsxs(Select, { value: subsample, onChange: this._inputChange('subsample', 'number'), children: [_jsx("option", { value: "0", children: "4:0:0" }), _jsx("option", { value: "1", children: "4:2:0" }), _jsx("option", { value: "2", children: "4:2:2" }), _jsx("option", { value: "3", children: "4:4:4" })] })] }), _jsx(Expander, { children: subsample === 1 && (_jsxs("label", { class: style.optionToggle, children: ["Sharp YUV Downsampling", _jsx(Checkbox, { checked: enableSharpYUV, onChange: this._inputChange('enableSharpYUV', 'boolean') })] })) }), _jsxs("label", { class: style.optionToggle, children: ["Separate alpha quality", _jsx(Checkbox, { checked: separateAlpha, onChange: this._inputChange('separateAlpha', 'boolean') })] }), _jsx(Expander, { children: separateAlpha && (_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: MAX_QUALITY - 1, value: alphaQuality, onInput: this._inputChange('alphaQuality', 'number'), children: "Alpha quality:" }) })) }), _jsxs("label", { class: style.optionToggle, children: ["Extra chroma compression", _jsx(Checkbox, { checked: chromaDeltaQ, onChange: this._inputChange('chromaDeltaQ', 'boolean') })] }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "7", value: sharpness, onInput: this._inputChange('sharpness', 'number'), children: "Sharpness:" }) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "50", value: denoiseLevel, onInput: this._inputChange('denoiseLevel', 'number'), children: "Noise synthesis:" }) }), _jsxs("label", { class: style.optionTextFirst, children: ["Tuning:", _jsxs(Select, { value: tune, onChange: this._inputChange('tune', 'number'), children: [_jsx("option", { value: 0 /* AVIFTune.auto */, children: "Auto" }), _jsx("option", { value: 1 /* AVIFTune.psnr */, children: "PSNR" }), _jsx("option", { value: 2 /* AVIFTune.ssim */, children: "SSIM" })] })] })] })) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "6", value: tileRows, onInput: this._inputChange('tileRows', 'number'), children: "Log2 of tile rows:" }) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "6", value: tileCols, onInput: this._inputChange('tileCols', 'number'), children: "Log2 of tile cols:" }) })] })) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: MAX_EFFORT, value: effort, onInput: this._inputChange('effort', 'number'), children: "Effort:" }) })] }));
    }
}
