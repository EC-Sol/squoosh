import { jsx as _jsx, jsxs as _jsxs } from "preact/jsx-runtime";
import { Component } from 'preact';
import * as style from './style.css';
import 'add-css:./style.css';
import { cleanSet, cleanMerge } from '../../util/clean-modify';
import { encoderMap, } from '../../feature-meta';
import Expander from './Expander';
import Toggle from './Toggle';
import Select from './Select';
import { Options as QuantOptionsComponent } from 'features/processors/quantize/client';
import { Options as ResizeOptionsComponent } from 'features/processors/resize/client';
import { ImportIcon, SaveIcon, SwapIcon } from 'client/lazy-app/icons';
const supportedEncoderMapP = (async () => {
    const supportedEncoderMap = {
        ...encoderMap,
    };
    // Filter out entries where the feature test fails
    await Promise.all(Object.entries(encoderMap).map(async ([encoderName, details]) => {
        if ('featureTest' in details && !(await details.featureTest())) {
            delete supportedEncoderMap[encoderName];
        }
    }));
    return supportedEncoderMap;
})();
export default class Options extends Component {
    constructor() {
        super();
        this.state = {
            supportedEncoderMap: undefined,
            leftSideSettings: localStorage.getItem('leftSideSettings'),
            rightSideSettings: localStorage.getItem('rightSideSettings'),
        };
        this.setLeftSideSettings = () => {
            this.setState({
                leftSideSettings: localStorage.getItem('leftSideSettings'),
            });
        };
        this.setRightSideSettings = () => {
            this.setState({
                rightSideSettings: localStorage.getItem('rightSideSettings'),
            });
        };
        this.onEncoderTypeChange = (event) => {
            const el = event.currentTarget;
            // The select element only has values matching encoder types,
            // so 'as' is safe here.
            const type = el.value;
            this.props.onEncoderTypeChange(this.props.index, type);
        };
        this.onProcessorEnabledChange = (event) => {
            const el = event.currentTarget;
            const processor = el.name.split('.')[0];
            this.props.onProcessorOptionsChange(this.props.index, cleanSet(this.props.processorState, `${processor}.enabled`, el.checked));
        };
        this.onQuantizerOptionsChange = (opts) => {
            this.props.onProcessorOptionsChange(this.props.index, cleanMerge(this.props.processorState, 'quantize', opts));
        };
        this.onResizeOptionsChange = (opts) => {
            this.props.onProcessorOptionsChange(this.props.index, cleanMerge(this.props.processorState, 'resize', opts));
        };
        this.onEncoderOptionsChange = (newOptions) => {
            this.props.onEncoderOptionsChange(this.props.index, newOptions);
        };
        this.onCopyToOtherSideClick = () => {
            this.props.onCopyToOtherSideClick(this.props.index);
        };
        this.onSaveSideSettingClick = () => {
            this.props.onSaveSideSettingsClick(this.props.index);
        };
        this.onImportSideSettingsClick = () => {
            this.props.onImportSideSettingsClick(this.props.index);
        };
        supportedEncoderMapP.then((supportedEncoderMap) => this.setState({ supportedEncoderMap }));
    }
    componentDidMount() {
        // Changing the state when side setting is stored in localstorage
        window.addEventListener('leftSideSettings', this.setLeftSideSettings);
        window.addEventListener('rightSideSettings', this.setRightSideSettings);
    }
    componentWillUnmount() {
        window.removeEventListener('leftSideSettings', this.setLeftSideSettings);
        window.removeEventListener('removeSideSettings', this.setRightSideSettings);
    }
    render({ source, encoderState, processorState }, { supportedEncoderMap }) {
        const encoder = encoderState && encoderMap[encoderState.type];
        const EncoderOptionComponent = encoder && 'Options' in encoder ? encoder.Options : undefined;
        return (_jsxs("div", { class: style.optionsScroller +
                ' ' +
                (encoderState ? '' : style.originalImage), children: [_jsx(Expander, { children: !encoderState ? null : (_jsxs("div", { children: [_jsx("h3", { class: style.optionsTitle, children: _jsxs("div", { class: style.titleAndButtons, children: ["Edit", _jsx("button", { class: style.copyOverButton, title: "Copy settings to other side", onClick: this.onCopyToOtherSideClick, children: _jsx(SwapIcon, {}) }), _jsx("button", { class: style.saveButton, title: "Save side settings", onClick: this.onSaveSideSettingClick, children: _jsx(SaveIcon, {}) }), _jsx("button", { class: style.importButton +
                                                ' ' +
                                                (!this.state.leftSideSettings && this.props.index === 0
                                                    ? style.buttonOpacity
                                                    : '') +
                                                ' ' +
                                                (!this.state.rightSideSettings && this.props.index === 1
                                                    ? style.buttonOpacity
                                                    : ''), title: "Import saved side settings", onClick: this.onImportSideSettingsClick, disabled: 
                                            // Disabled if this side's settings haven't been saved
                                            (!this.state.leftSideSettings &&
                                                this.props.index === 0) ||
                                                (!this.state.rightSideSettings && this.props.index === 1), children: _jsx(ImportIcon, {}) })] }) }), _jsxs("label", { class: style.sectionEnabler, children: ["Resize", _jsx(Toggle, { name: "resize.enable", checked: !!processorState.resize.enabled, onChange: this.onProcessorEnabledChange })] }), _jsx(Expander, { children: processorState.resize.enabled ? (_jsx(ResizeOptionsComponent, { isVector: Boolean(source && source.vectorImage), inputWidth: source ? source.preprocessed.width : 1, inputHeight: source ? source.preprocessed.height : 1, options: processorState.resize, onChange: this.onResizeOptionsChange })) : null }), _jsxs("label", { class: style.sectionEnabler, children: ["Reduce palette", _jsx(Toggle, { name: "quantize.enable", checked: !!processorState.quantize.enabled, onChange: this.onProcessorEnabledChange })] }), _jsx(Expander, { children: processorState.quantize.enabled ? (_jsx(QuantOptionsComponent, { options: processorState.quantize, onChange: this.onQuantizerOptionsChange })) : null })] })) }), _jsx("h3", { class: style.optionsTitle, children: "Compress" }), _jsx("section", { class: `${style.optionOneCell} ${style.optionsSection}`, children: supportedEncoderMap ? (_jsxs(Select, { value: encoderState ? encoderState.type : 'identity', onChange: this.onEncoderTypeChange, large: true, children: [_jsx("option", { value: "identity", children: `Original Image ${this.props.source ? `(${this.props.source.file.name})` : ''}` }), Object.entries(supportedEncoderMap).map(([type, encoder]) => (_jsx("option", { value: type, children: encoder.meta.label })))] })) : (_jsx(Select, { large: true, children: _jsx("option", { children: "Loading\u2026" }) })) }), _jsx(Expander, { children: EncoderOptionComponent && (_jsx(EncoderOptionComponent, { options: 
                        // Casting options, as encoderOptionsComponentMap[encodeData.type] ensures
                        // the correct type, but typescript isn't smart enough.
                        encoderState.options, onChange: this.onEncoderOptionsChange })) })] }));
    }
}
