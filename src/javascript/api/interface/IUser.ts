import { IConversation } from "./IConversation";

export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    conversations: IConversation[]
}