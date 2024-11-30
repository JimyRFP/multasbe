import { BotChat } from "../../models/chat";
import { Message, WhatsAppMessageType } from "../../whatsapp/api/types";
import { BotState } from "../types";
import { isPersonGetNextState } from "./states/isPerson";
import { sendNotificationGetNextState } from "./states/sendnotification";
import { wantHelpGetNextState } from "./states/wanthelp";
import { BotNextState } from "./types";

export async function botGetNextState(chat:BotChat,messages:Array<Message>){
   try{
      let nextState:BotNextState={
          state:BotState.error,
      }
      if(messages.length<1)
         throw "must have message";
      switch(chat.current_state){
          case BotState.clientGetInTouch:
             nextState={
                  state:BotState.clientGetInTouch,
                  stayQuiet:true,
             }
            break;
         case BotState.sendNotification:
            nextState=await sendNotificationGetNextState(chat,messages[0]);
            break;  
         case BotState.isPerson:
            nextState=await isPersonGetNextState(chat,messages[0]);
            break;   
         case BotState.wantHelp:
            nextState=await wantHelpGetNextState(chat,messages[0]);
            break;   
         default:
             nextState.keepState=true;
             break;   
      }
      return nextState;
   }catch(e){
      throw e;
   }
}