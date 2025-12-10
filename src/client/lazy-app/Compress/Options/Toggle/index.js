import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
export default class Toggle extends Component {
    render(props) {
        return (_jsxs("div", { class: style.checkbox, children: [_jsx("input", { class: style.realCheckbox, type: "checkbox", ...props }), _jsx("div", { class: style.track, children: _jsx("div", { class: style.thumbTrack, children: _jsx("div", { class: style.thumb }) }) })] }));
    }
}
