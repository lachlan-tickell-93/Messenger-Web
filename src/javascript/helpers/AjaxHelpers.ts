import { IFetchResponse } from "../api/response/IFetchResponse";

export class AuthError extends Error {
    name = "AuthError";
    isAuthError = true;

    constructor(){
        super("Unauthorized to access the requested resource");
    }
}

export class FetchError extends Error {
    name = "FetchError";
    status: number;

    constructor(message: string){
        super(message);
    }
}

export class TimeoutError extends Error {
    name = "TimeoutError";
    isTimeoutError = true;

    constructor(){
        super("Timeout occurred");
    }
}

export async function runRequest<T>(f: () => Promise<IFetchResponse<T>>, timeout: number = null) {
    let response;

    if (!timeout) {
        response = await f();
    } else {
        let req = new Promise(async (resolve) => {
            response = await f();
            resolve(false);
        });

        let delay = new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, timeout);
        });

        let isTimedOut = await Promise.race([
            req,
            delay
        ]);

        if (isTimedOut) {
            throw new TimeoutError();
        }
    }

    if (!response){
        throw new FetchError("An Error Occurred");
    } else if (response.status === 524){
        throw new TimeoutError();
    } else if (response.status === 401) {
        throw new AuthError();
    } else if (!response.ok) {
        throw new FetchError(response.statusText);
    }

    try {
        return await response.json();
    }
    catch (e) {
        //handle empty body of response
        //may be better ways to do this
        return {} as T;
    }
}

export async function manageAjaxRequest<T>(f: () => Promise<T>, onAuthError: (e: Error) => void, onError: (e: Error) => void) {
    try {
        return await f();
    }
    catch(e){
        if(e && e.name === "AuthError") {
            onAuthError(e);
            return;
        } else {
            onError(e);
            return;
        }
    }
}