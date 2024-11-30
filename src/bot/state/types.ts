import { Message } from "../../whatsapp/api/types";
import { BotState } from "../types";

export interface BotNextState{
   state:BotState,
   stayQuiet?:boolean,
   message?:Array<Message>,
   fallBack?:boolean,
   keepState?:boolean,
}