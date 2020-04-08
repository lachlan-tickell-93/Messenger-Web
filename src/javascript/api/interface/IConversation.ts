import { IMessage } from "./IMessage";

export interface IConversation {
    id: number;
    messages: IMessage[];
}