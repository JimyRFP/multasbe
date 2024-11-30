import { LanguagesEnum } from "whatsapp_with_token/build/types/enums";
import {  whatsAppGetClientByPhone } from "./client";
import { WAMessages } from "../../models/wa_messages";
import { WhatsAppMessageType } from "./types";
import { WATemplateSended } from "../../models/sended_template";


export async function whatsappSendText(to:number,message:string,senderNumber:string){
  try{
    const wa=await whatsAppGetClientByPhone(senderNumber);
    const r=await  wa.messages.text({'body':message},to);
    const msgsave=await WAMessages.create({
      sender:senderNumber,
      receiver:to,
      type:WhatsAppMessageType.text,
      text:message,
      root_server_number:senderNumber,
    });
   return r;
  }catch(e){
      throw e;
  }
}

export async function whatsappSendTextTemplate(to:number,templateName:string,lang:LanguagesEnum,senderNumber:string,components?:any[]){
    try{
      const wa=await whatsAppGetClientByPhone(senderNumber);
      const r=await wa.messages.template({
         name:templateName,
         language:{
          //@ts-ignore
          policy: 'deterministic',
          code:lang,
         },
         components:components,
      },to);
      let jsonReponse="";
      try{
        jsonReponse=JSON.stringify(await r.responseBodyToJSON())
      }catch(e){

      }
      await WATemplateSended.create({
        template_name:templateName,
        template_lang:lang,
        phone:senderNumber,
        params:components?JSON.stringify(components):'',
        status_code:r.statusCode(),
        meta_response:jsonReponse,
        client_phone:to,
      });
      if(r.statusCode()==200){
          await WAMessages.create({
            sender:senderNumber,
            receiver:to,
            type:WhatsAppMessageType.text,
            template_params_json:components?JSON.stringify(components):'',
            template_name:templateName,
            template_lang:lang,
            root_server_number:senderNumber,
        });
      }else{
        throw r;
      }
     return r;
    }catch(e){
      throw e;
    }
}


