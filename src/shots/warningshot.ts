import { Op } from "sequelize";
import { DetranWarning } from "../models/detranwarning";
import { Person } from "../models/person";
import { phonesStringToArray } from "../utils/phones";
import { sleep } from "../utils/sleep";
import { getOrCreateChat } from "../bot/chat";
import { BotState } from "../bot/types";
import { waSendAskIsPerson1 } from "../whatsapp/api/templates/call_link";
import { getShotServerPhone } from "./phone";
export async function shotDetranWarning(){
    try{
      const minDate=new Date((new Date()).getTime()-(1000*60*60*24*5));
      const warnings=await DetranWarning.findAll({
        where:{
            phone_warned:false,
            created_at:{
                [Op.gte]:minDate
            }
        },
        include:[Person],
        order:[['created_at','DESC']],
        limit:5000,
      });
      for(let warning of warnings){
          const waShot=await getShotServerPhone();
          if(!waShot)
              break;
          if(!warning.Person)
             continue;
          if(!warning.Person.phones_array)
            continue;
          warning.phone_warned=true;
          await warning.save();
          const phones=phonesStringToArray(warning.Person.phones_array);
          if(phones.length>4){
               continue;
          }
          
         await shot(waShot.phone,warning,warning.Person);
            
      }
    }catch(e){
         throw e;
    }
}
export async function shot(botPhone:string,warning:DetranWarning,person:Person){
  try{
     const phones=phonesStringToArray(person.phones_array||'');
     for(let ph of phones){
           await waSendAskIsPerson1(botPhone,person.name,ph);
           const chat=await getOrCreateChat(botPhone,ph);
           chat.warning_id=warning.id;
           chat.current_state=BotState.sendNotification;
           await chat.save();
     }
  }catch(e){ 
      throw e;
  }
}

export async function shotDetranWarningEternal(){
      try{
          await shotDetranWarning();
      }catch(e){

      }
      await sleep(1000*60*10);
      shotDetranWarningEternal();
}