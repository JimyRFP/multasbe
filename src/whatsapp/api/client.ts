import WhatsApp from 'whatsapp_with_token';
import { WANumber } from '../../models/wa';

export async function getWaDbWithPhone(rootPhone:string){
   try{
    const wa=await WANumber.findOne({where:{phone:rootPhone,is_active:true}});
    if(!wa)
        throw "Unknown sender number";
    return wa;  
   }catch(e){
      throw e;
   }
}
export async function whatsAppGetClientByPhone(senderNumber:string){
    try{
      const wa=await getWaDbWithPhone(senderNumber);
      return whatsAppGetClient(wa);
    }catch(e){
      throw e;
    }
   
}
export async function whatsAppGetClient(wa:WANumber){
  const waApi=new WhatsApp(parseInt(wa.phone_id),wa.token);
  return waApi;
}