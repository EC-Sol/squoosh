import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import { UncheckedIcon, CheckedIcon } from '../../../icons';
export default class Checkbox extends Component {
    render(props) {
        return (_jsxs("div", { class: style.checkbox, children: [props.checked ? (props.disabled ? (_jsx(CheckedIcon, { class: `${style.icon} ${style.disabled} ` })) : (_jsx(CheckedIcon, { class: `${style.icon} ${style.checked} ` }))) : (_jsx(UncheckedIcon, { class: style.icon })), _jsx("input", { class: style.realCheckbox, type: "checkbox", ...props })] }));
    }
}
