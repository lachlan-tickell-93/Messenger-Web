import AddMessageRequest from "../request/AddMessageRequest";
import { IFetchResponse } from "../response/IFetchResponse";
import { IMessage } from "../interface/IMessage";

export default class MessageClient{
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async addMessageToConversation(request: AddMessageRequest, auth_token: string) {
        return await fetch(`${this.baseUrl}api/messages`, {
            method: "post",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${auth_token}` },
            body: JSON.stringify(request)
        }) as IFetchResponse<IMessage[]>;
    }
}