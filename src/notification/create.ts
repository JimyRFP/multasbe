import { getWarningAndPersonFromChat } from "../bot/state/states/warningandperson";
import { BotChat } from "../models/chat";
import { WantHelp } from "../models/want_help";
import { WantHelpStatus } from "./types";

export async function createWantHelp(chat:BotChat){
   try{
      const {detranWarning,person}=await getWarningAndPersonFromChat(chat);
      const wh=await WantHelp.create({
          status:WantHelpStatus.opened,
          person_id:person.id,
          warning_id:detranWarning.id,
          client_phone:chat.client_phone,
          bot_phone:chat.bot_phone,
      });
     return wh;
   }catch(e){
      throw e;
   }
}