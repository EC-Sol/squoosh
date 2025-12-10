import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import { preventDefault, shallowEqual } from 'client/lazy-app/util';
import * as style from 'client/lazy-app/Compress/Options/style.css';
import Range from 'client/lazy-app/Compress/Options/Range';
import Checkbox from 'client/lazy-app/Compress/Options/Checkbox';
import Expander from 'client/lazy-app/Compress/Options/Expander';
export const encode = (signal, workerBridge, imageData, options) => workerBridge.jxlEncode(signal, imageData, options);
export class Options extends Component {
    constructor() {
        super(...arguments);
        // The rest of the defaults are set in getDerivedStateFromProps
        this.state = {
            lossless: false,
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
                        quality: optionState.lossless ? 100 : optionState.quality,
                        progressive: optionState.progressive,
                        epf: optionState.autoEdgePreservingFilter
                            ? -1
                            : optionState.edgePreservingFilter,
                        lossyPalette: optionState.lossless ? optionState.slightLoss : false,
                        decodingSpeedTier: optionState.decodingSpeedTier,
                        photonNoiseIso: optionState.photonNoiseIso,
                        lossyModular: optionState.quality < 7 ? true : optionState.alternativeLossy,
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
        // Create default form state from options
        return {
            options,
            effort: options.effort,
            quality: options.quality,
            progressive: options.progressive,
            edgePreservingFilter: options.epf === -1 ? 2 : options.epf,
            lossless: options.quality === 100,
            slightLoss: options.lossyPalette,
            autoEdgePreservingFilter: options.epf === -1,
            decodingSpeedTier: options.decodingSpeedTier,
            photonNoiseIso: options.photonNoiseIso,
            alternativeLossy: options.lossyModular,
        };
    }
    render({}, { effort, quality, progressive, edgePreservingFilter, lossless, slightLoss, autoEdgePreservingFilter, decodingSpeedTier, photonNoiseIso, alternativeLossy, }) {
        // I'm rendering both lossy and lossless forms, as it becomes much easier when
        // gathering the data.
        return (_jsxs("form", { class: style.optionsSection, onSubmit: preventDefault, children: [_jsxs("label", { class: style.optionToggle, children: ["Lossless", _jsx(Checkbox, { name: "lossless", checked: lossless, onChange: this._inputChange('lossless', 'boolean') })] }), _jsx(Expander, { children: lossless && (_jsxs("label", { class: style.optionToggle, children: ["Slight loss", _jsx(Checkbox, { name: "slightLoss", checked: slightLoss, onChange: this._inputChange('slightLoss', 'boolean') })] })) }), _jsx(Expander, { children: !lossless && (_jsxs("div", { children: [_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "99.9", step: "0.1", value: quality, onInput: this._inputChange('quality', 'number'), children: "Quality:" }) }), _jsxs("label", { class: style.optionToggle, children: ["Alternative lossy mode", _jsx(Checkbox, { checked: quality < 7 ? true : alternativeLossy, disabled: quality < 7, onChange: this._inputChange('alternativeLossy', 'boolean') })] }), _jsxs("label", { class: style.optionToggle, children: ["Auto edge filter", _jsx(Checkbox, { checked: autoEdgePreservingFilter, onChange: this._inputChange('autoEdgePreservingFilter', 'boolean') })] }), _jsx(Expander, { children: !autoEdgePreservingFilter && (_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "3", value: edgePreservingFilter, onInput: this._inputChange('edgePreservingFilter', 'number'), children: "Edge preserving filter:" }) })) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "4", value: decodingSpeedTier, onInput: this._inputChange('decodingSpeedTier', 'number'), children: "Optimise for decoding speed (worse compression):" }) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "0", max: "50000", step: "100", value: photonNoiseIso, onInput: this._inputChange('photonNoiseIso', 'number'), children: "Noise equivalent to ISO:" }) })] })) }), _jsxs("label", { class: style.optionToggle, children: ["Progressive rendering", _jsx(Checkbox, { name: "progressive", checked: progressive, onChange: this._inputChange('progressive', 'boolean') })] }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { min: "1", max: "9", value: effort, onInput: this._inputChange('effort', 'number'), children: "Effort:" }) })] }));
    }
}
