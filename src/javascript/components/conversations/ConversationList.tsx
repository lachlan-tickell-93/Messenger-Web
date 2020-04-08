import * as React from 'react';

import { conversationState } from '../../state/stores/ConversationStore';

import Conversation from './Conversation'
import { observer } from 'mobx-react';

@observer
export default class ConversationList extends React.Component {
    render() {
        return (
            <div className="conversation-list-container">
                <div className="conversation-list">
                    {conversationState.user.conversations.map((conversation, index) =>
                        <Conversation conversation={conversation} key={index} />
                    )}
                </div>
            </div>
        )
    }
}