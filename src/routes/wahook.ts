import { Router } from "express";
import express from 'express';
import { ENV } from "../env";
import { sendIError } from "serverpreconfigured/dist/utils/response";
import { WAMessageHook, WhatsAppMessageType } from "../whatsapp/api/types";
import { WAMessages } from "../models/wa_messages";
import meta_sanitizer from "meta-sanitizer";
import { botTrigger } from "../bot/trigger";
import { LogSeverity, saveLog } from "serverpreconfigured/dist/logs/logs";
import { justNumbers } from "meta-sanitizer/dist/justNumbers";
import { getWaDbWithPhone } from "../whatsapp/api/client";
import { phonewith9 } from "../utils/phones";

export const router=Router();

router.get('/hook/:number/:token',express.json(),(req:any,res:any)=>{
   try{
      const mode=req.query['hub.mode'];
      const verifyToken=req.query['hub.verify_token'];
      if(verifyToken!==ENV.WA_HOOK_TOKEN)
         return res.sendStatus(401);
      if(mode==='subscribe'){
         return res.send(req.query['hub.challenge']);
      }
      res.sendStatus(403);
   }catch(e){
      return sendIError(req,res,e);
   }
  
})


router.post('/hook/:number/:token',express.raw({type:'application/json'}),async (req,res)=>{
   try{   
    const xHubSignature = req.headers['x-hub-signature-256']?.toString().replace('sha256=', '');
    if(!xHubSignature){
          throw "Invalid signature";
    }
    const entrys=JSON.parse(req.body).entry;
    
    if(!entrys){
          throw "Must have entrys"
    } 
    
    for(let entry of entrys){
       const changes=entry.changes;
       if(!changes)
          continue;
       for(let change of changes){
           const field=change.field;
           const metadata=change.value?.metadata;
           if(!metadata){
                console.log('Meta Data Unknwon');
                throw "unknown metadata";
           }
             
           const display_phone_number=parseInt(justNumbers(metadata.display_phone_number||'',false)); 
           const phone_number_id=parseInt(justNumbers(metadata.phone_number_id||'',false));
           if(!display_phone_number||isNaN(display_phone_number)){
                 console.log('DisplaY number error is not number',display_phone_number);
                 throw "Display number error";
           }
           const wa=await getWaDbWithPhone(display_phone_number.toString());
           
           if(wa.phone_id!==phone_number_id.toString()){
               console.log(wa.phone_id,phone_number_id);
               throw "WaNumber is diferent id";
           }
           switch(field){
              case 'messages':
                 const messages=change.value.messages;
                 if(!messages){
                     res.sendStatus(401);
                     return;
                 }      
                 for(let m of messages){
                   await saveMessageAndCallBot(m,display_phone_number.toString());
                 }
                 break;
           }
       }
    }
    res.sendStatus(200);
    return;
   }catch(e){
       sendIError(req,res,e);
       return;
   }
}
)


export async function saveMessageAndCallBot(message:WAMessageHook,botNumber:string){
   try{
      
      const messageTime=new Date(message.timestamp*1000);
      const now=new Date();
      if(messageTime.getTime()<(now.getTime()-(1000*60*15))){ 
         return;
      }
      let text='';
      let isUnknown=false;
      switch(message.type){
           case WhatsAppMessageType.text:
               text=message.text?.body||'';
               break;
            case WhatsAppMessageType.button:
               text='SIM';
               break;    
            default:
               isUnknown=true;
               break;    
      }  
      text=meta_sanitizer.queryProtector(text);
      const from=phonewith9(message.from);
      if(!from){
         throw "error on message";
      }
      const msgsave=await WAMessages.create({
          sender:from,
          receiver:botNumber,
          type:message.type,
          text:text,
          root_server_number:botNumber,
      });
      botTrigger({
         botNumber:botNumber,
         clientNumber:from,
         text:text,
      });
   }catch(e){
        throw e;
   }
}
