import { getOrCreateChat } from "../../bot/chat"
import { botGetNextState } from "../../bot/state/next";
import { botTrigger } from "../../bot/trigger"
import { BotState } from "../../bot/types";
import { WhatsAppMessageType } from "../../whatsapp/api/types";

(async ()=>{
    try{
        const botPhone='55499198';
        const clientPhone='5549998144777';
        const text='ss';
        const chat=await getOrCreateChat(botPhone,clientPhone);
        chat.current_state=BotState.wantHelp;
        chat.warning_id=1;
        console.log(await botGetNextState(chat,[{type:WhatsAppMessageType.text,text}]))
    }catch(e){
       console.log(e);
    }
})()