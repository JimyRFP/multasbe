import { Op } from "sequelize";
import { BotChat } from "../models/chat";
import { phonewith9 } from "../utils/phones";
import { BotState } from "./types";

export async function getOrCreateChat(botPhone:string,clientNumber:string){
  try{
     const usePhone=phonewith9(clientNumber);
     if(!usePhone)
        throw "invalid user phone";
     const min=new Date((new Date()).getTime()-(1000*60*60*24)+(60000));
     let chat=await BotChat.findOne({
        where:{
            bot_phone:botPhone,
            client_phone:usePhone,
            created_at:{
                [Op.gte]:min
            },
            is_active:true,
        }
     });
     if(!chat){
         chat=await BotChat.create({
            bot_phone:botPhone,
            client_phone:usePhone,
            current_state:BotState.clientGetInTouch
         });
     }
     return chat;
  }catch(e){
    throw e;
  }
}

