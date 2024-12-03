import { afirmationResult } from "../../../ia/negOrPositive";
import { BotChat } from "../../../models/chat";
import { CNH } from "../../../models/cnh";
import { DetranWarning } from "../../../models/detranwarning";
import { Person } from "../../../models/person";
import { getFirstName } from "../../../utils/name";
import { Message, WhatsAppMessageType } from "../../../whatsapp/api/types";
import { BotState } from "../../types";
import { BotNextState } from "../types";
import { getWarningAndPersonFromChat } from "./warningandperson";

export async function sendNotificationGetNextState(chat:BotChat,message:Message){
    try{
       const isOrNo=await afirmationResult(message.text||"");
       const {detranWarning,person}=await getWarningAndPersonFromChat(chat);   
       let nextState:BotNextState={
         state:BotState.error 
       }
       if(isOrNo=='positive'){
          nextState={
            state:BotState.isPerson,
            message:[{
                type:WhatsAppMessageType.text,
                text:`${getFirstName(person.name)}, seu nome foi listado no Diário Oficial da União, notificando que você está sujeito a um processo que pode suspender o seu direito de dirigir. Eu posso te auxiliar nesse caso e gostaria de oferecer nosso suporte para recorrer dessa decisão. Você tem interesse em saber mais?`,
            }]
          }
       }else if(isOrNo=='negative'){
          nextState={
             state:BotState.notIsPerson,
             message:[{
                type:WhatsAppMessageType.text,
                text:`Certo, peço desculpa pelo transtorno.`,
             }]
          }
       }else{
           nextState={
              state:BotState.sendNotification,
              fallBack:true,
              message:[
                {type:WhatsAppMessageType.text,
                 text:`Desculpa, não entendi, digite 'SIM' se o seu nome for ${person.name}.`,   
                }
              ]
           }
       }
       return nextState;
    }catch(e){
        throw e;
    }
}