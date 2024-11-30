import { BotChat } from "../../../models/chat";
import { DetranWarning } from "../../../models/detranwarning";
import { Person } from "../../../models/person";

export async function getWarningAndPersonFromChat(chat:BotChat){
    try{
       if(!chat.DetranWarning){
          let war=await DetranWarning.findOne({where:{
            id:chat.warning_id
          }})
          if(!war)
              throw 'unknown warning';
          chat.DetranWarning=war;  
       }
       if(!chat.DetranWarning.Person){
           let per=await Person.findOne({where:{
             id:chat.DetranWarning.person_id
           }});
           if(!per)
              throw "unknown person";
           chat.DetranWarning.Person=per;  
       }
       return {
         detranWarning:chat.DetranWarning,
         person:chat.DetranWarning.Person,
       }
    }catch(e){
        throw e;
    }
}