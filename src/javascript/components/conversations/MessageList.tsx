import * as React from 'react';
import { observer } from 'mobx-react';

import Message from './Message'
import { IConversation } from '../../api/interface/IConversation';

export interface MessageListProps {
    conversation: IConversation;
}

@observer
export default class MessageList extends React.Component<MessageListProps> {
    constructor(props) {
        super(props);
        console.log("CONSTRUCTOR MESSAGE LIST");
    }

    messageEnd: HTMLDivElement;

    componentDidMount() {
        this.scrollToBottom("auto");
    }
    
    componentDidUpdate() {
        var element = document.getElementById('message-list');
        let newMessageHeight = 40; // Allow for the height of a new message before scrolling down
        if (element.scrollHeight - element.scrollTop <= (element.clientHeight + newMessageHeight)) {
            this.scrollToBottom("smooth");
        }
    }

    scrollToBottom = (scrollBehavior: ScrollBehavior) => {
        this.messageEnd.scrollIntoView({ behavior: scrollBehavior });
    }
    
    setMessageEnd = (el: HTMLDivElement) => {
        this.messageEnd = el;
    }

    render() {
        console.log("RENDER MESSAGE LIST");

        return (
            <div id="message-list" className="message-list-container">
                {this.props.conversation.messages.map((message, index) =>
                    <Message message={message} key={message.id}/>
                )}
                <div ref={this.setMessageEnd}>
                </div>
            </div>
        )
    }
}