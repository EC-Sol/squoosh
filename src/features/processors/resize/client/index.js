import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { builtinResize, drawableToImageData, } from 'client/lazy-app/util/canvas';
import { workerResizeMethods, } from '../shared/meta';
import { getContainOffsets } from '../shared/util';
import { Component } from 'preact';
import linkState from 'linkstate';
import { inputFieldValueAsNumber, inputFieldValue, preventDefault, inputFieldChecked, } from 'client/lazy-app/util';
import * as style from 'client/lazy-app/Compress/Options/style.css';
import { linkRef } from 'shared/prerendered-app/util';
import Select from 'client/lazy-app/Compress/Options/Select';
import Expander from 'client/lazy-app/Compress/Options/Expander';
import Checkbox from 'client/lazy-app/Compress/Options/Checkbox';
/**
 * Return whether a set of options are worker resize options.
 *
 * @param opts
 */
function isWorkerOptions(opts) {
    return workerResizeMethods.includes(opts.method);
}
function browserResize(data, opts) {
    let sx = 0;
    let sy = 0;
    let sw = data.width;
    let sh = data.height;
    if (opts.fitMethod === 'contain') {
        ({ sx, sy, sw, sh } = getContainOffsets(sw, sh, opts.width, opts.height));
    }
    return builtinResize(data, sx, sy, sw, sh, opts.width, opts.height, opts.method.slice('browser-'.length));
}
function vectorResize(data, opts) {
    let sx = 0;
    let sy = 0;
    let sw = data.width;
    let sh = data.height;
    if (opts.fitMethod === 'contain') {
        ({ sx, sy, sw, sh } = getContainOffsets(sw, sh, opts.width, opts.height));
    }
    return drawableToImageData(data, {
        sx,
        sy,
        sw,
        sh,
        width: opts.width,
        height: opts.height,
    });
}
export async function resize(signal, source, options, workerBridge) {
    if (options.method === 'vector') {
        if (!source.vectorImage)
            throw Error('No vector image available');
        return vectorResize(source.vectorImage, options);
    }
    if (isWorkerOptions(options)) {
        return workerBridge.resize(signal, source.preprocessed, options);
    }
    return browserResize(source.preprocessed, options);
}
const sizePresets = [0.25, 0.3333, 0.5, 1, 2, 3, 4];
export class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maintainAspect: true,
        };
        this.presetWidths = {};
        this.presetHeights = {};
        this.onChange = () => {
            this.reportOptions();
        };
        this.onWidthInput = () => {
            if (this.state.maintainAspect) {
                const width = inputFieldValueAsNumber(this.form.width);
                this.form.height.value = Math.round(width / this.getAspect());
            }
            this.reportOptions();
        };
        this.onHeightInput = () => {
            if (this.state.maintainAspect) {
                const height = inputFieldValueAsNumber(this.form.height);
                this.form.width.value = Math.round(height * this.getAspect());
            }
            this.reportOptions();
        };
        this.onPresetChange = (event) => {
            const select = event.target;
            if (select.value === 'custom')
                return;
            const multiplier = Number(select.value);
            this.form.width.value =
                Math.round(this.props.inputWidth * multiplier) + '';
            this.form.height.value =
                Math.round(this.props.inputHeight * multiplier) + '';
            this.reportOptions();
        };
        this.generatePresetValues(props.inputWidth, props.inputHeight);
    }
    reportOptions() {
        const form = this.form;
        const width = form.width;
        const height = form.height;
        const { options } = this.props;
        if (!width.checkValidity() || !height.checkValidity())
            return;
        const newOptions = {
            width: inputFieldValueAsNumber(width),
            height: inputFieldValueAsNumber(height),
            method: form.resizeMethod.value,
            premultiply: inputFieldChecked(form.premultiply, true),
            linearRGB: inputFieldChecked(form.linearRGB, true),
            // Casting, as the formfield only returns the correct values.
            fitMethod: inputFieldValue(form.fitMethod, options.fitMethod),
        };
        this.props.onChange(newOptions);
    }
    getAspect() {
        return this.props.inputWidth / this.props.inputHeight;
    }
    componentDidUpdate(prevProps, prevState) {
        if (!prevState.maintainAspect && this.state.maintainAspect) {
            this.form.height.value = Math.round(Number(this.form.width.value) / this.getAspect());
            this.reportOptions();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.inputWidth !== nextProps.inputWidth ||
            this.props.inputHeight !== nextProps.inputHeight) {
            this.generatePresetValues(nextProps.inputWidth, nextProps.inputHeight);
        }
    }
    generatePresetValues(width, height) {
        for (const preset of sizePresets) {
            this.presetWidths[preset] = Math.round(width * preset);
            this.presetHeights[preset] = Math.round(height * preset);
        }
    }
    getPreset() {
        const { width, height } = this.props.options;
        for (const preset of sizePresets) {
            if (width === this.presetWidths[preset] &&
                height === this.presetHeights[preset])
                return preset;
        }
        return 'custom';
    }
    render({ options, isVector }, { maintainAspect }) {
        return (_jsxs("form", { ref: linkRef(this, 'form'), class: style.optionsSection, onSubmit: preventDefault, children: [_jsxs("label", { class: style.optionTextFirst, children: ["Method:", _jsxs(Select, { name: "resizeMethod", value: options.method, onChange: this.onChange, children: [isVector && _jsx("option", { value: "vector", children: "Vector" }), _jsx("option", { value: "lanczos3", children: "Lanczos3" }), _jsx("option", { value: "mitchell", children: "Mitchell" }), _jsx("option", { value: "catrom", children: "Catmull-Rom" }), _jsx("option", { value: "triangle", children: "Triangle (bilinear)" }), _jsx("option", { value: "hqx", children: "hqx (pixel art)" }), _jsx("option", { value: "browser-pixelated", children: "Browser pixelated" }), _jsx("option", { value: "browser-low", children: "Browser low quality" }), _jsx("option", { value: "browser-medium", children: "Browser medium quality" }), _jsx("option", { value: "browser-high", children: "Browser high quality" })] })] }), _jsxs("label", { class: style.optionTextFirst, children: ["Preset:", _jsxs(Select, { value: this.getPreset(), onChange: this.onPresetChange, children: [sizePresets.map((preset) => (_jsxs("option", { value: preset, children: [preset * 100, "%"] }))), _jsx("option", { value: "custom", children: "Custom" })] })] }), _jsxs("label", { class: style.optionTextFirst, children: ["Width:", _jsx("input", { required: true, class: style.textField, name: "width", type: "number", min: "1", value: '' + options.width, onInput: this.onWidthInput })] }), _jsxs("label", { class: style.optionTextFirst, children: ["Height:", _jsx("input", { required: true, class: style.textField, name: "height", type: "number", min: "1", value: '' + options.height, onInput: this.onHeightInput })] }), _jsxs(Expander, { children: [isWorkerOptions(options) ? (_jsxs("label", { class: style.optionToggle, children: ["Premultiply alpha channel", _jsx(Checkbox, { name: "premultiply", checked: options.premultiply, onChange: this.onChange })] })) : null, isWorkerOptions(options) ? (_jsxs("label", { class: style.optionToggle, children: ["Linear RGB", _jsx(Checkbox, { name: "linearRGB", checked: options.linearRGB, onChange: this.onChange })] })) : null] }), _jsxs("label", { class: style.optionToggle, children: ["Maintain aspect ratio", _jsx(Checkbox, { name: "maintainAspect", checked: maintainAspect, onChange: linkState(this, 'maintainAspect') })] }), _jsx(Expander, { children: maintainAspect ? null : (_jsxs("label", { class: style.optionTextFirst, children: ["Fit method:", _jsxs(Select, { name: "fitMethod", value: options.fitMethod, onChange: this.onChange, children: [_jsx("option", { value: "stretch", children: "Stretch" }), _jsx("option", { value: "contain", children: "Contain" })] })] })) })] }));
    }
}
