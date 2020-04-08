import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { conversationState } from '../state/stores/ConversationStore'
import { InputFieldState, InputField } from '../common/InputField';
import ConversationList from '../components/conversations/ConversationList';
import { Link } from 'react-router-dom';
import { SignInPageRoute } from '../routing/routes';

export interface HomeProps {
    title: string;
}

@observer 
export default class HomePage extends React.Component<HomeProps> {
    userField = new InputFieldState();

    render() {

        return (
            <div className="home-page-container">
                <Link to={SignInPageRoute}>Back to sign in</Link>

                <form onSubmit={this.startNewConversation}>
                    <InputField inputFieldState={this.userField} />
                    <button type="submit">New conversation</button>
                </form>

                <div>
                    {`Hello, ${conversationState.user.first_name} ${conversationState.user.last_name}, ID: ${conversationState.user.id}`}
                </div>

                <ConversationList />

            </div>
        )
    }

    startNewConversation = async (e: React.FormEvent) => {
        e.preventDefault();
        await conversationState.addNewConversation(parseInt(this.userField.value));
        this.userField.value = "";
    }
}