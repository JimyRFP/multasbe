import { BotState } from "../bot/types";
import { WhatsAppMessageType } from "../whatsapp/api/types";

export interface ChatInfo{
    from:string,
    to:string,
    messages:Array<string>,
    chatId:string,
    createdAt:Date,
    lastUpdate:Date,
}

export interface ChatMessageInfo{
    type:WhatsAppMessageType,
    data:string,
}
export interface ChatNextStateInfo{
    nextState:BotState,
    messages?:Array<ChatMessageInfo>
    isFallBack?:boolean,
    stayQuiet?:boolean,
    keepState?:boolean,
}