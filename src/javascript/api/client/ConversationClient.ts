import { IFetchResponse } from "../response/IFetchResponse";
import AddConversationRequest from "../request/AddConversationRequest";

export default class ConversationClient{
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async addConversation(request: AddConversationRequest, auth_token: string) {
        return await fetch(`${this.baseUrl}api/conversations`, {
            method: "post",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${auth_token}` },
            body: JSON.stringify(request)
        }) as IFetchResponse<null>;
    }
}