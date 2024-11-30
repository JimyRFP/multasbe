import { Router } from "express";
import { JSONResponse, sendIError } from "serverpreconfigured/dist/utils/response";
import { BotChat } from "../models/chat";
import { Op } from "sequelize";
import { WAMessages } from "../models/wa_messages";
import { WANumber } from "../models/wa";
import { setUserDataMiddleware } from "serverpreconfigured";
export const router=Router();
router.use(setUserDataMiddleware);
router.post('/numbers',async (req,res)=>{
    try{
        const numbers=await WANumber.findAll({where:{is_active:true}});
        const ret=[];
        for(let n of numbers){
             ret.push(n.phone)
        }
        return res.send(JSONResponse({numbers:ret}));
    }catch(e){
        return sendIError(req,res,e);
    }
})
router.post('/chats',async (req,res)=>{
   try{
     const minDate=new Date((new Date()).getTime()-(1000*60*60*24));
     const chats=await BotChat.findAll({where:{
         created_at:{
            [Op.gte]:minDate
         }
     }});
     let ret=[];
     for(let c of chats){
        ret.push({
            id:c.id,
            createdAt:c.createdAt,
            botPhone:c.bot_phone,
            clientPhone:c.client_phone,
            currentState:c.current_state,
            updatedAt:c.updatedAt,
        })
     };
     return res.send(JSONResponse({chats:ret}));
   }catch(e){
      return sendIError(req,res,e);
   }
});
router.post('/messages/:chatId',async (req,res)=>{
    try{
      const chatId=parseInt(req.params.chatId);
      if(!chatId||isNaN(chatId))
          throw "must have chatid";
      const chat=await BotChat.findOne({where:{id:chatId}});  
      if(!chat)
          throw "Unknown chat";
      const minDate=new Date(chat.createdAt.getTime()-60000);
      const messages=await WAMessages.findAll({where:{
        root_server_number:chat.bot_phone,
        sender:{
            [Op.or]:[chat.bot_phone,chat.client_phone]
        },
        receiver:{
            [Op.or]:[chat.bot_phone,chat.client_phone]
        },
        created_at:{
            [Op.gte]:minDate,
        }
      }});
      let ret=[];
      for(let msg of messages){
         ret.push({
            type:msg.type,
            templateName:msg.template_name,
            text:msg.text,
            rootServerNumber:msg.root_server_number,
            sender:msg.sender,
            receiver:msg.receiver,
            createdAt:msg.createdAt,
         })
      }  
      return res.send(JSONResponse({messages:ret}));
    }catch(e){
        return sendIError(req,res,e);
    }
})