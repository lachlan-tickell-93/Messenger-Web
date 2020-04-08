import { IFetchResponse } from "../response/IFetchResponse";
import { IUser } from "../interface/IUser";
import { IConversation } from "../interface/IConversation";

export default class UserClient{
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getAuthenticatedUser(auth_token: string) {
        return await fetch(`${this.baseUrl}api/users/current`, {
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${auth_token}` },
            body: undefined
        }) as IFetchResponse<IUser>;
    }

    async getConversationsForAuthenticatedUser(auth_token: string) {
        return await fetch(`${this.baseUrl}api/users/conversations`, {
            method: "get",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${auth_token}` },
            body: undefined
        }) as IFetchResponse<IConversation[]>;
    }
}