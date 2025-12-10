import { h, Component } from 'preact';
import 'add-css:./style.css';
interface Props extends preact.JSX.HTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    name?: string;
    value?: string | number;
    onChange?: (event: Event) => void;
}
interface State {
}
export default class Toggle extends Component<Props, State> {
    render(props: Props): h.JSX.Element;
}
export {};
