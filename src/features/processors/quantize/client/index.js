import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import * as style from 'client/lazy-app/Compress/Options/style.css';
import { inputFieldValueAsNumber, konami, preventDefault, } from 'client/lazy-app/util';
import Expander from 'client/lazy-app/Compress/Options/Expander';
import Select from 'client/lazy-app/Compress/Options/Select';
import Range from 'client/lazy-app/Compress/Options/Range';
const konamiPromise = konami();
export class Options extends Component {
    constructor() {
        super(...arguments);
        this.state = { extendedSettings: false };
        this.onChange = (event) => {
            const form = event.currentTarget.closest('form');
            const { options } = this.props;
            const newOptions = {
                zx: inputFieldValueAsNumber(form.zx, options.zx),
                maxNumColors: inputFieldValueAsNumber(form.maxNumColors, options.maxNumColors),
                dither: inputFieldValueAsNumber(form.dither),
            };
            this.props.onChange(newOptions);
        };
    }
    componentDidMount() {
        konamiPromise.then(() => {
            this.setState({ extendedSettings: true });
        });
    }
    render({ options }, { extendedSettings }) {
        return (_jsxs("form", { class: style.optionsSection, onSubmit: preventDefault, children: [_jsx(Expander, { children: extendedSettings ? (_jsxs("label", { class: style.optionTextFirst, children: ["Type:", _jsxs(Select, { name: "zx", value: '' + options.zx, onChange: this.onChange, children: [_jsx("option", { value: "0", children: "Standard" }), _jsx("option", { value: "1", children: "ZX" })] })] })) : null }), _jsx(Expander, { children: options.zx ? null : (_jsx("div", { class: style.optionOneCell, children: _jsx(Range, { name: "maxNumColors", min: "2", max: "256", value: options.maxNumColors, onInput: this.onChange, children: "Colors:" }) })) }), _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { name: "dither", min: "0", max: "1", step: "0.01", value: options.dither, onInput: this.onChange, children: "Dithering:" }) })] }));
    }
}
