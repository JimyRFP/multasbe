import { WANumber } from "../models/wa";
import { waAccountCanShot } from "../whatsapp/api/templates/status";

export async function getShotServerPhone(){
  try{
     const was=await WANumber.findAll({where:{
        is_active:true,
     }});
     for(let wa of was){
        if(await waAccountCanShot(wa)){
            return wa;
        }
     }
     return false;
  }catch(e){

  }
}