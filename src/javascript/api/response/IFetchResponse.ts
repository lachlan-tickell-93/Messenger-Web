export interface IFetchResponse<T> extends Response {
    json(): Promise<T>;
}