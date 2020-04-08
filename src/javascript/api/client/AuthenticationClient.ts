import { IFetchResponse } from "../response/IFetchResponse";
import AuthenticationRequest from "../request/AuthenticationRequest";
import AuthenticationResponse from "../response/AuthenticationResponse";

export default class AuthenticationClient{
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async authenticateUser(request: AuthenticationRequest) {
        return await fetch(`${this.baseUrl}api/authenticate`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request)
        }) as IFetchResponse<AuthenticationResponse>;
    }
}