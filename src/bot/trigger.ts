import { BotState, BotTriggerInfo } from "./types"
import { callFnIfTimeOut } from "../chat/callfn"
import { getOrCreateChat } from "./chat"
import { botGetNextState } from "./state/next";
import { Message, WhatsAppMessageType } from "../whatsapp/api/types";
import { BotChat } from "../models/chat";
import { BotNextState } from "./state/types";
import { whatsappSendText } from "../whatsapp/api/sendtext";
export function botTrigger(data:BotTriggerInfo){
    callFnIfTimeOut(data.clientNumber,data.botNumber,data.text,botEvent)
}
async function botEvent(data:{from:string,to:string,message:string}){
   try{
      const clientPhone=data.from;
      const botPhone=data.to;
      const chat=await getOrCreateChat(botPhone,clientPhone);
      if(await isBlocked(chat))
         return;
      const nextState=await botGetNextState(chat,[{type:WhatsAppMessageType.text,text:data.message}]);
      await updateChatState(chat,nextState);
    }catch(e){
      throw e;
   }
}
async function isBlocked(chat:BotChat){
     if(chat.fallback_number>4)
          return true;
     if(chat.total_messages>50)
         return true;
     if(chat.current_state==BotState.error||chat.current_state==BotState.stop)
         return true;
     return false;         
}
async function updateChatState(chat:BotChat,nextState:BotNextState){
   try{
        if(!nextState.keepState)
           chat.current_state=nextState.state;
        chat.total_messages++;
        if(nextState.fallBack){
            chat.fallback_number++;
        }else{
            chat.fallback_number=0;
        }
        await chat.save();
        if(!nextState.stayQuiet&&nextState.message){
            await sendMessages(chat,nextState.message);
        }
            
   }catch(e){
     throw e;
   }
}

async function sendMessages(chat:BotChat,messages:Array<Message>){
    try{
       for(let me of messages){
           switch(me.type){
              case WhatsAppMessageType.text:
                 await whatsappSendText(parseInt(chat.client_phone),me.text||'',chat.bot_phone);
                  break;
           }
       }
    }catch(e){
        throw e;
    }
}
