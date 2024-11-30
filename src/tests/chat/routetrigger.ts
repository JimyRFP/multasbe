import { saveMessageAndCallBot } from "../../routes/wahook";
import { WhatsAppMessageType } from "../../whatsapp/api/types";

(async ()=>{
   try{
       await saveMessageAndCallBot({type:WhatsAppMessageType.text,
        from:'5549991976615',
        timestamp:new Date().getTime(),
        text:{body:'ok'},},"5549999014500");
        
   }catch(e){
      console.log(e);
   }
})()