import { observable, action, computed, runInAction } from 'mobx';
import { createTransformer } from 'mobx-utils';

import * as ajax from "../../helpers/AjaxHelpers";

import ConversationClient from '../../api/client/ConversationClient';
import MessageClient from '../../api/client/MessageClient';
import UserClient from '../../api/client/UserClient';

import { IUser } from '../../api/interface/IUser';
import { IConversation } from '../../api/interface/IConversation';
import { IMessage } from '../../api/interface/IMessage';
import AuthenticationClient from '../../api/client/AuthenticationClient';
import AuthenticationResponse from '../../api/response/AuthenticationResponse';
import SocketConnection from '../../api/connections/SocketConnection';

 const API_BASE = "https://messenger-dev-api-v1.herokuapp.com/";
 const CABLE_BASE = "wss://messenger-dev-api-v1.herokuapp.com/cable";

//const API_BASE = "http://localhost:3000/";
// const CABLE_BASE = "ws://localhost:3000/cable"; 

export interface IConversationState {
    user: IUser;

    /* Getters */
    getConversationById(id: number) : IConversation;

    /* Computed */
    conversationCount: number;

    /* Actions */
    addMessageToConversation(conversationId: number, message: string);
}

export default class ConversationState implements IConversationState {

    _messageClient = new MessageClient(API_BASE);
    _conversationClient = new ConversationClient(API_BASE);
    _userClient = new UserClient(API_BASE);
    _authenticationClient = new AuthenticationClient(API_BASE);
    _socketConnection = new SocketConnection(CABLE_BASE);

    @observable user = { conversations: [] } as IUser;

    /* Computed */
    get conversationCount() : number {
        return this.user.conversations.length;
    }

    getConversationById = createTransformer((id: number) => {
        return this.user.conversations.find(x => x.id === id);
    });

    /* Actions */
    @action async signIn(email: string, password: string) {
        try {
            let request = { email, password };

            const response = await ajax.runRequest(() => this._authenticationClient.authenticateUser(request)) as AuthenticationResponse;

            localStorage.setItem("auth_token", response.auth_token);
            await this.getUser();

        } catch (error) {
            console.log(error);
        }
    }
    
    @action async getUser() {
        try {
            if(!this.authToken()) {
                return;
            }

            const response = await ajax.runRequest(() => this._userClient.getAuthenticatedUser(this.authToken())) as IUser;

            this.setUser(response);
        } catch (error) {
            console.log(error);
        }
    }

    @action async addNewConversation(toUserId: number) {
        try {
            if(!this.authToken()) {
                return;
            }

            let request = { to_user_id: toUserId };

            await ajax.runRequest(() => this._conversationClient.addConversation(request, this.authToken())) as IConversation;
        } catch (error) {
            console.log(error)
        }
    }

    @action async addMessageToConversation(conversationId: number, message: string) {
        let conversationIndex = this.user.conversations.findIndex(x => x.id === conversationId);
        
        if(conversationIndex < 0 || !message || !this.authToken()) {
            return;
        }

        try {
            let messageRequest = { conversation_id: conversationId, text: message };

            await ajax.runRequest(() => this._messageClient.addMessageToConversation(messageRequest, this.authToken())) as IMessage;

        } catch (error) {
            runInAction(() => {
                console.log(error)
            })
        }
    }

    @action private setUser(user: IUser) {
        this.user.id = user.id;
        this.user.first_name = user.first_name;
        this.user.last_name = user.last_name;

        this._socketConnection.subscribeUser(user.id, conversation => {
            this.setConversation(conversation);
        });

        user.conversations.forEach((conversation) => {
            this.setConversation(conversation);
        });
    }
    
    @action private setConversation(conversation: IConversation) {
        if(!conversation) {
            return;
        }
        debugger
        let conversationIndex = this.user.conversations.findIndex(x => x.id === conversation.id);

        if(conversationIndex < 0) {
            if(!conversation.messages) {
                conversation.messages = [];
            }
            this.user.conversations.push(conversation);
            this._socketConnection.subscribeConversation(conversation.id, message => {
                this.setMessage(message);
            });
        } else {
            this.user.conversations[conversationIndex] = conversation;
        }
    }

    @action private setMessage(message: IMessage) {
        let conversationIndex = this.user.conversations.findIndex(x => x.id === message.conversation_id);
        if(conversationIndex < 0 || !message) {
            return;
        }

        let messageIndex = this.user.conversations[conversationIndex].messages.findIndex(x => x.id === message.id);

        if(messageIndex < 0) {
            this.user.conversations[conversationIndex].messages.push(message);
        } else {
            this.user.conversations[conversationIndex].messages[messageIndex].text = message.text;
        }
    }

    private authToken() : string {
        return localStorage.getItem("auth_token");
    }
}