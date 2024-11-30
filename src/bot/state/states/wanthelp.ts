import { afirmationResult } from "../../../ia/negOrPositive";
import { BotChat } from "../../../models/chat";
import { CNH } from "../../../models/cnh";
import { DetranWarning } from "../../../models/detranwarning";
import { Person } from "../../../models/person";
import { createWantHelp } from "../../../notification/create";
import { getFirstName } from "../../../utils/name";
import { Message, WhatsAppMessageType } from "../../../whatsapp/api/types";
import { BotState } from "../../types";
import { BotNextState } from "../types";
import { getWarningAndPersonFromChat } from "./warningandperson";

export async function wantHelpGetNextState(chat:BotChat,message:Message){
    try{
       const isOrNo=await afirmationResult(message.text||"");
       const {detranWarning,person}=await getWarningAndPersonFromChat(chat);
       let nextState:BotNextState={
         state:BotState.error 
       }
       if(isOrNo=='positive'){
        await createWantHelp(chat);
        nextState={
            state:BotState.isCnh,
            message:[{
               type:WhatsAppMessageType.text,
               text:`Certo ${getFirstName(person.name)}, em breve um dos nossos especialistas entrará em contato.`,
            }]
         }
       }else if(isOrNo=='negative'){
          nextState={
             state:BotState.notWantHelp,
             message:[{
                type:WhatsAppMessageType.text,
                text:`Compreendido. Visto que o número de registro não coincide, concluímos que você não é a pessoa mencionada no edital.\nPedimos desculpas pelo transtorno.`,
             }]
          }
       }else{
            const cnh=await CNH.findOne({where:{person_id:person.id}});
            if(!cnh)
            throw "unknown cnh";
            nextState={
                state:BotState.wantHelp,
                message:[{
                    type:WhatsAppMessageType.text,
                    text:`Para confirmarmos que você é a pessoa citada no edital, por favor, digite 'SIM' se o número de registro da sua CNH for ${cnh.number}. Caso contrário, digite 'NÃO'.`,
                }],
                fallBack:true,
            }
       }
       return nextState;
    }catch(e){
        throw e;
    }
}