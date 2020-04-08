import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

type InputFieldType = "text" | "password";

export class InputFieldState {
    constructor(value?: string, type?: InputFieldType) {
        this.value = value != null ? value : "";
        this.type = type != null ? type : "text";
    }

    @observable value = "";
    
    type: InputFieldType = "text";

    onChange(newValue: string) {
        this.value = newValue;
    }
}

@observer
export class InputField extends React.Component<{ inputFieldState : InputFieldState }> {
    render() {
        return (
            <input type={this.props.inputFieldState.type} value={this.props.inputFieldState.value} onChange={
                (e) => this.props.inputFieldState.onChange(e.target.value)
            }
            />
        )
    }
}