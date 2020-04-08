import * as React from 'react';

import { conversationState } from '../../state/stores/ConversationStore'

import MessageList from './MessageList';
import { InputField, InputFieldState } from '../../common/InputField';
import { IConversation } from '../../api/interface/IConversation';

export interface ConversationProps {
    conversation: IConversation;
}

export default class Conversation extends React.Component<ConversationProps> {
    constructor(props) {
        super(props);
        console.log("CONSTRUCTOR CONVERSATION");
    }

    message = new InputFieldState();
    
    render() {
        console.log("RENDER CONVERSATION");

        return (

            <div className="conversation-container">
                
                <MessageList conversation={this.props.conversation} />

                <form onSubmit={this.sendMessage}>
                    <InputField inputFieldState={this.message}/>
                    <button type="submit">Send</button>
                </form>
            </div>
        )
    }

    sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        conversationState.addMessageToConversation(this.props.conversation.id, this.message.value);
        this.message.value = "";
    }
}