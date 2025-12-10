import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import { Arrow } from 'client/lazy-app/icons';
export default class Select extends Component {
    render(props) {
        const { large, ...otherProps } = props;
        return (_jsxs("div", { class: style.select, children: [_jsx("select", { class: `${style.builtinSelect} ${large ? style.large : ''}`, ...otherProps }), _jsx("div", { class: style.arrow, children: _jsx(Arrow, {}) })] }));
    }
}
