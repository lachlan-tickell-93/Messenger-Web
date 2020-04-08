import * as React from 'react';
import {Redirect, Route, RouteProps} from 'react-router';
import { conversationState } from '../state/stores/ConversationStore'

export class ProtectedRoute extends Route {
    public render() {
        let redirectPath: string = '';
        
        if (conversationState.user == null || conversationState.user.id == null) {
            redirectPath = '/signIn';
        }

        if (redirectPath) {
            const renderComponent = () => (<Redirect to={{pathname: redirectPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        } else {
            return <Route {...this.props}/>;
        }
    }
}