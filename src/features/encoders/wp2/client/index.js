import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { defaultOptions } from '../shared/meta';
import { Component } from 'preact';
import { preventDefault, shallowEqual } from 'client/lazy-app/util';
import * as style from 'client/lazy-app/Compress/Options/style.css';
import Range from 'client/lazy-app/Compress/Options/Range';
import Select from 'client/lazy-app/Compress/Options/Select';
import Checkbox from 'client/lazy-app/Compress/Options/Checkbox';
import Expander from 'client/lazy-app/Compress/Options/Expander';
import linkState from 'linkstate';
import Revealer from 'client/lazy-app/Compress/Options/Revealer';
export const encode = (signal, workerBridge, imageData, options) => workerBridge.wp2Encode(signal, imageData, options);
export class Options extends Component {
    constructor() {
        super(...arguments);
        // Other state is set in getDerivedStateFromProps
        this.state = {
            lossless: false,
            slightLoss: 0,
            quality: defaultOptions.quality,
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
                        : Number(formEl.value);
                    const newState = {
                        [prop]: newVal,
                    };
                    const optionState = {
                        ...this.state,
                        ...newState,
                    };
                    const newOptions = {
                        effort: optionState.effort,
                        quality: optionState.lossless
                            ? 100 - optionState.slightLoss
                            : optionState.quality,
                        alpha_quality: optionState.separateAlpha
                            ? optionState.alphaQuality
                            : optionState.quality,
                        pass: optionState.passes,
                        sns: optionState.sns,
                        uv_mode: optionState.uvMode,
                        csp_type: optionState.colorSpace,
                        error_diffusion: optionState.errorDiffusion,
                        use_random_matrix: optionState.useRandomMatrix,
                    };
                    // Updating options, so we don't recalculate in getDerivedStateFromProps.
                    newState.options = newOptions;
                    this.setState(newState);
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
        const modifyState = {
            options,
            effort: options.effort,
            alphaQuality: options.alpha_quality,
            passes: options.pass,
            sns: options.sns,
            uvMode: options.uv_mode,
            colorSpace: options.csp_type,
            errorDiffusion: options.error_diffusion,
            useRandomMatrix: options.use_random_matrix,
            separateAlpha: options.quality !== options.alpha_quality,
        };
        // If quality is > 95, it's lossless with slight loss
        if (options.quality > 95) {
            modifyState.lossless = true;
            modifyState.slightLoss = 100 - options.quality;
        }
        else {
            modifyState.quality = options.quality;
            modifyState.lossless = false;
        }
        return modifyState;
    }
    render({}, { effort, alphaQuality, passes, quality, sns, uvMode, lossless, slightLoss, colorSpace, errorDiffusion, useRandomMatrix, separateAlpha, showAdvanced, }) {
        return (_jsxs("form", { class: style.optionsSection, onSubmit: preventDefault, children: [_jsxs("label", { class: style.optionToggle, children: ["Lossless", _jsx(Checkbox, { checked: lossless, onChange: this._inputChange('lossless', 'boolean') })] }), _jsx(Expander, { children: lossless && (_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "5", step: "0.1", value: slightLoss, onInput: this._inputChange('slightLoss', 'number'), children: "Slight loss:" }) })) }), _jsx(Expander, { children: !lossless && (_jsxs("div", { children: [_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "95", step: "0.1", value: quality, onInput: this._inputChange('quality', 'number'), children: "Quality:" }) }), _jsxs("label", { class: style.optionToggle, children: ["Separate alpha quality", _jsx(Checkbox, { checked: separateAlpha, onChange: this._inputChange('separateAlpha', 'boolean') })] }), _jsx(Expander, { children: separateAlpha && (_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "100", step: "1", value: alphaQuality, onInput: this._inputChange('alphaQuality', 'number'), children: "Alpha Quality:" }) })) }), _jsxs("label", { class: style.optionReveal, children: [_jsx(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }), "Advanced settings"] }), _jsx(Expander, { children: showAdvanced && (_jsxs("div", { children: [_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "1", max: "10", step: "1", value: passes, onInput: this._inputChange('passes', 'number'), children: "Passes:" }) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "100", step: "1", value: sns, onInput: this._inputChange('sns', 'number'), children: "Spatial noise shaping:" }) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "100", step: "1", value: errorDiffusion, onInput: this._inputChange('errorDiffusion', 'number'), children: "Error diffusion:" }) }), _jsxs("label", { class: style.optionTextFirst, children: ["Subsample chroma:", _jsxs(Select, { value: uvMode, onInput: this._inputChange('uvMode', 'number'), children: [_jsx("option", { value: 3 /* UVMode.UVModeAuto */, children: "Auto" }), _jsx("option", { value: 0 /* UVMode.UVModeAdapt */, children: "Vary" }), _jsx("option", { value: 1 /* UVMode.UVMode420 */, children: "Half" }), _jsx("option", { value: 2 /* UVMode.UVMode444 */, children: "Off" })] })] }), _jsxs("label", { class: style.optionTextFirst, children: ["Color space:", _jsxs(Select, { value: colorSpace, onInput: this._inputChange('colorSpace', 'number'), children: [_jsx("option", { value: 0 /* Csp.kYCoCg */, children: "YCoCg" }), _jsx("option", { value: 1 /* Csp.kYCbCr */, children: "YCbCr" }), _jsx("option", { value: 3 /* Csp.kYIQ */, children: "YIQ" })] })] }), _jsxs("label", { class: style.optionToggle, children: ["Random matrix", _jsx(Checkbox, { checked: useRandomMatrix, onChange: this._inputChange('useRandomMatrix', 'boolean') })] })] })) })] })) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "9", step: "1", value: effort, onInput: this._inputChange('effort', 'number'), children: "Effort:" }) })] }));
    }
}
