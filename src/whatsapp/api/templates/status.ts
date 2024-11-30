import { Op } from "sequelize";
import { WATemplateSended } from "../../../models/sended_template";
import { WANumber } from "../../../models/wa";


export async function waAccountCanShot(wa:WANumber){
    try{
        const minDate=new Date((new Date()).getTime()-(1000*60*60*26));
        const templates=await WATemplateSended.findAll({where:{
             created_at:{
                [Op.gte]:minDate,
             },
             is_active:true,
             phone:wa.phone,
        }});
        if(wa.shot_limit>templates.length)
            return true;
        return false;
    }catch(e){
        throw e;
    }
  
}