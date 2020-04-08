import * as React from 'react';
import { IMessage } from '../../api/interface/IMessage';

import { conversationState } from '../../state/stores/ConversationStore';
import { observer } from 'mobx-react';

export interface IMessageProps {
    message: IMessage;
}

export const Message = (props: IMessageProps) => {
    console.log("RENDER MESSAGE");

    return (
        <div className="message-container">
            <div className={(props.message.user_id === conversationState.user.id ? "current-user-message" : "other-user-message")}>
                {props.message.text}
            </div>
        </div>
    )
};
export default Message;