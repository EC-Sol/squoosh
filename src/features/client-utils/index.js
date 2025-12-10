import { jsx as _jsx } from "preact/jsx-runtime";
import { Component } from 'preact';
import * as style from 'client/lazy-app/Compress/Options/style.css';
import Range from 'client/lazy-app/Compress/Options/Range';
export function qualityOption(opts = {}) {
    const { min = 0, max = 100, step = 1 } = opts;
    class QualityOptions extends Component {
        constructor() {
            super(...arguments);
            this.onChange = (event) => {
                const el = event.currentTarget;
                this.props.onChange({ quality: Number(el.value) });
            };
        }
        render({ options }) {
            return (_jsx("div", { class: style.optionsSection, children: _jsx("div", { class: style.optionOneCell, children: _jsx(Range, { name: "quality", min: min, max: max, step: step || 'any', value: options.quality, onInput: this.onChange, children: "Quality:" }) }) }));
        }
    }
    return QualityOptions;
}
