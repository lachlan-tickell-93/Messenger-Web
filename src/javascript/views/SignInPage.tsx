import * as React from 'react';
import { observer } from 'mobx-react';
import { conversationState } from '../state/stores/ConversationStore'
import { InputFieldState, InputField } from '../common/InputField';
import { RouteComponentProps } from 'react-router';
import { HomePageRoute } from '../routing/routes';

export default class SignInPage extends React.Component<RouteComponentProps> {
    email = new InputFieldState();
    password = new InputFieldState("", "password");

    render() {

        return (
            <div className="sign-in-page-container">
                <div>
                    {`Hello, please sign in to continue`}
                </div>

                <form onSubmit={this.signIn}>
                    <InputField inputFieldState={this.email}/>
                    <InputField inputFieldState={this.password}/>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        )
    }

    signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        
        await conversationState.signIn(this.email.value, this.password.value);
        
        this.password.value = "";
        this.props.history.push(HomePageRoute);
    }
}