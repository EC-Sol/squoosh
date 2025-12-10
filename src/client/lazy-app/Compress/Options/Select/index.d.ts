import { h, Component } from 'preact';
import 'add-css:./style.css';
interface Props extends preact.JSX.HTMLAttributes<HTMLSelectElement> {
    large?: boolean;
    name?: string;
    value?: string | number;
    onChange?: (event: Event) => void;
}
interface State {
}
export default class Select extends Component<Props, State> {
    render(props: Props): h.JSX.Element;
}
export {};
