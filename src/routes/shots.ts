import { Router } from "express";
import { JSONResponse, setUserDataMiddleware } from "serverpreconfigured";
import { dateGetFirstDateOfDay, dateGetLastDateOfDay } from "../utils/hours";
import meta_sanitizer from "meta-sanitizer";
import { WATemplateSended } from "../models/sended_template";
import { Op } from "sequelize";

export const router=Router();
router.use(setUserDataMiddleware);
router.post('/list',async (req,res)=>{
    try{
        const start=dateGetFirstDateOfDay(new Date(req.body.start));
        const end=dateGetLastDateOfDay(new Date(req.body.end));
        const phones=[];
        
        if(!Array.isArray(req.body.phones))
             throw "must have phones";
        for(let ph of req.body.phones){
            let cph=meta_sanitizer.justNumbers(ph,false);
            if(!cph)
                 continue;
            phones.push(cph);    
        }    
        if(phones.length<1)
             throw "must have at least one phone";
        const list=await WATemplateSended.findAll({where:{
            created_at:{
                [Op.gte]:start,
                [Op.lte]:end
            },
            phone:{
                [Op.or]:phones
            }
        }});
        let ret=[];
        for(let l of list){
            ret.push(l.dataValues);
        }
        return res.send(JSONResponse({list:ret}));
    }catch(e){
         throw e;
    }
})