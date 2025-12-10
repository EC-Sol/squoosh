import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import { Arrow } from '../../../icons';
export default class Revealer extends Component {
    render(props) {
        return (_jsxs("div", { class: style.checkbox, children: [_jsx("input", { class: style.realCheckbox, type: "checkbox", ...props }), _jsx("div", { class: style.arrow, children: _jsx(Arrow, {}) })] }));
    }
}
