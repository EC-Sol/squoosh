import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import { inputFieldChecked, inputFieldValueAsNumber, preventDefault, } from 'client/lazy-app/util';
import * as style from 'client/lazy-app/Compress/Options/style.css';
import linkState from 'linkstate';
import Range from 'client/lazy-app/Compress/Options/Range';
import Checkbox from 'client/lazy-app/Compress/Options/Checkbox';
import Expander from 'client/lazy-app/Compress/Options/Expander';
import Select from 'client/lazy-app/Compress/Options/Select';
import Revealer from 'client/lazy-app/Compress/Options/Revealer';
export function encode(signal, workerBridge, imageData, options) {
    return workerBridge.mozjpegEncode(signal, imageData, options);
}
export class Options extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showAdvanced: false,
        };
        this.onChange = (event) => {
            const form = event.currentTarget.closest('form');
            const { options } = this.props;
            const newOptions = {
                // Copy over options the form doesn't currently care about, eg arithmetic
                ...this.props.options,
                // And now stuff from the form:
                // .checked
                baseline: inputFieldChecked(form.baseline, options.baseline),
                progressive: inputFieldChecked(form.progressive, options.progressive),
                optimize_coding: inputFieldChecked(form.optimize_coding, options.optimize_coding),
                trellis_multipass: inputFieldChecked(form.trellis_multipass, options.trellis_multipass),
                trellis_opt_zero: inputFieldChecked(form.trellis_opt_zero, options.trellis_opt_zero),
                trellis_opt_table: inputFieldChecked(form.trellis_opt_table, options.trellis_opt_table),
                auto_subsample: inputFieldChecked(form.auto_subsample, options.auto_subsample),
                separate_chroma_quality: inputFieldChecked(form.separate_chroma_quality, options.separate_chroma_quality),
                // .value
                quality: inputFieldValueAsNumber(form.quality, options.quality),
                chroma_quality: inputFieldValueAsNumber(form.chroma_quality, options.chroma_quality),
                chroma_subsample: inputFieldValueAsNumber(form.chroma_subsample, options.chroma_subsample),
                smoothing: inputFieldValueAsNumber(form.smoothing, options.smoothing),
                color_space: inputFieldValueAsNumber(form.color_space, options.color_space),
                quant_table: inputFieldValueAsNumber(form.quant_table, options.quant_table),
                trellis_loops: inputFieldValueAsNumber(form.trellis_loops, options.trellis_loops),
            };
            this.props.onChange(newOptions);
        };
    }
    render({ options }, { showAdvanced }) {
        // I'm rendering both lossy and lossless forms, as it becomes much easier when
        // gathering the data.
        return (_jsxs("form", { class: style.optionsSection, onSubmit: preventDefault, children: [_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { name: "quality", min: "0", max: "100", value: options.quality, onInput: this.onChange, children: "Quality:" }) }), _jsxs("label", { class: style.optionReveal, children: [_jsx(Revealer, { checked: showAdvanced, onChange: linkState(this, 'showAdvanced') }), "Advanced settings"] }), _jsx(Expander, { children: showAdvanced ? (_jsxs("div", { children: [_jsxs("label", { class: style.optionTextFirst, children: ["Channels:", _jsxs(Select, { name: "color_space", value: options.color_space, onChange: this.onChange, children: [_jsx("option", { value: 1 /* MozJpegColorSpace.GRAYSCALE */, children: "Grayscale" }), _jsx("option", { value: 2 /* MozJpegColorSpace.RGB */, children: "RGB" }), _jsx("option", { value: 3 /* MozJpegColorSpace.YCbCr */, children: "YCbCr" })] })] }), _jsx(Expander, { children: options.color_space === 3 /* MozJpegColorSpace.YCbCr */ ? (_jsxs("div", { children: [_jsxs("label", { class: style.optionToggle, children: ["Auto subsample chroma", _jsx(Checkbox, { name: "auto_subsample", checked: options.auto_subsample, onChange: this.onChange })] }), _jsx(Expander, { children: options.auto_subsample ? null : (_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { name: "chroma_subsample", min: "1", max: "4", value: options.chroma_subsample, onInput: this.onChange, children: "Subsample chroma by:" }) })) }), _jsxs("label", { class: style.optionToggle, children: ["Separate chroma quality", _jsx(Checkbox, { name: "separate_chroma_quality", checked: options.separate_chroma_quality, onChange: this.onChange })] }), _jsx(Expander, { children: options.separate_chroma_quality ? (_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { name: "chroma_quality", min: "0", max: "100", value: options.chroma_quality, onInput: this.onChange, children: "Chroma quality:" }) })) : null })] })) : null }), _jsxs("label", { class: style.optionToggle, children: ["Pointless spec compliance", _jsx(Checkbox, { name: "baseline", checked: options.baseline, onChange: this.onChange })] }), _jsx(Expander, { children: options.baseline ? null : (_jsxs("label", { class: style.optionToggle, children: ["Progressive rendering", _jsx(Checkbox, { name: "progressive", checked: options.progressive, onChange: this.onChange })] })) }), _jsx(Expander, { children: options.baseline ? (_jsxs("label", { class: style.optionToggle, children: ["Optimize Huffman table", _jsx(Checkbox, { name: "optimize_coding", checked: options.optimize_coding, onChange: this.onChange })] })) : null }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { name: "smoothing", min: "0", max: "100", value: options.smoothing, onInput: this.onChange, children: "Smoothing:" }) }), _jsxs("label", { class: style.optionTextFirst, children: ["Quantization:", _jsxs(Select, { name: "quant_table", value: options.quant_table, onChange: this.onChange, children: [_jsx("option", { value: "0", children: "JPEG Annex K" }), _jsx("option", { value: "1", children: "Flat" }), _jsx("option", { value: "2", children: "MSSIM-tuned Kodak" }), _jsx("option", { value: "3", children: "ImageMagick" }), _jsx("option", { value: "4", children: "PSNR-HVS-M-tuned Kodak" }), _jsx("option", { value: "5", children: "Klein et al" }), _jsx("option", { value: "6", children: "Watson et al" }), _jsx("option", { value: "7", children: "Ahumada et al" }), _jsx("option", { value: "8", children: "Peterson et al" })] })] }), _jsxs("label", { class: style.optionToggle, children: ["Trellis multipass", _jsx(Checkbox, { name: "trellis_multipass", checked: options.trellis_multipass, onChange: this.onChange })] }), _jsx(Expander, { children: options.trellis_multipass ? (_jsxs("label", { class: style.optionToggle, children: ["Optimize zero block runs", _jsx(Checkbox, { name: "trellis_opt_zero", checked: options.trellis_opt_zero, onChange: this.onChange })] })) : null }), _jsxs("label", { class: style.optionToggle, children: ["Optimize after trellis quantization", _jsx(Checkbox, { name: "trellis_opt_table", checked: options.trellis_opt_table, onChange: this.onChange })] }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { name: "trellis_loops", min: "1", max: "50", value: options.trellis_loops, onInput: this.onChange, children: "Trellis quantization passes:" }) })] })) : null })] }));
    }
}
