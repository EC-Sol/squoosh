import { h, Component } from 'preact';
import 'add-css:./style.css';
interface Props extends preact.JSX.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    disabled?: boolean;
    name?: string;
}
interface State {
}
export default class Checkbox extends Component<Props, State> {
    render(props: Props): h.JSX.Element;
}
export {};
