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

export async function isPersonGetNextState(chat:BotChat,message:Message){
    try{
       const isOrNo=await afirmationResult(message.text||"");
       const {detranWarning,person}=await getWarningAndPersonFromChat(chat);
       let nextState:BotNextState={
         state:BotState.error 
       }
       if(isOrNo=='positive'){
          const cnh=await CNH.findOne({where:{person_id:person.id}});
          if(!cnh)
             throw "unknown cnh";
          nextState={
            state:BotState.wantHelp,
            message:[{
                type:WhatsAppMessageType.text,
                text:`Certo ${getFirstName(person.name)}, para confirmarmos que você é a pessoa citada no edital, por favor, digite 'SIM' se o número de registro da sua CNH for ${cnh.number}. Caso contrário, digite 'NÃO'.`,
            }]
          }
       }else if(isOrNo=='negative'){
          nextState={
             state:BotState.notWantHelp,
             message:[{
                type:WhatsAppMessageType.text,
                text:`Compreendido, pedimos desculpas pelo transtorno.`,
             }]
          }
       }else{
           nextState={
              state:BotState.isPerson,
              fallBack:true,
              message:[
                {type:WhatsAppMessageType.text,
                 text:`${getFirstName(person.name)}, caso queira saber mais sobre esse processo de suspensão de CNH, digite 'SIM', caso contrário, digite 'NÃO'.\n\n*Esse é um atendimento automatizado.*`,   
                }
              ]
           }
       }
       return nextState;
    }catch(e){
        throw e;
    }
}