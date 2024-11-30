import { Router } from "express";
import { setUserDataMiddleware } from "serverpreconfigured";
import { stringToWantHelpStatus, WantHelpStatus } from "../notification/types";
import { JSONResponse, sendIError } from "serverpreconfigured/dist/utils/response";
import { WantHelp } from "../models/want_help";
import { DetranWarning } from "../models/detranwarning";
import { Person } from "../models/person";
import { CNH } from "../models/cnh";
import { UnionEdital } from "../models/ue";
export const router=Router();
router.use(setUserDataMiddleware);
router.post('/updateStatus/:id/:status',async (req,res)=>{
    try{
       const id=parseInt(req.params.id);
       const status=stringToWantHelpStatus(req.params.status);
       if(isNaN(id)||!status)
          throw "Invalid params";
       const wh=await WantHelp.findOne({where:{id:id,is_active:true}});
       if(!wh)
          throw "unknown id";
       wh.status=status;
       await wh.save();
       res.sendStatus(200); 
    }catch(e){
        console.log(e);
        sendIError(req,res,e);
        return;
    }
})
router.get('/list',async (req,res)=>{
     try{
        const status=stringToWantHelpStatus(req.query.status||'');
        let where:any={
            is_active:true,
        }
        if(status){
            where.status=status;
        }
        const list=await WantHelp.findAll({where:where,include:[{model:DetranWarning,include:[UnionEdital]},{model:Person,include:[CNH]}]});
        let ret=[];
        for(let l of list){
            ret.push({
                id:l.id,
                bot_phone:l.bot_phone,
                client_phone:l.client_phone,
                status:l.status,
                createdAt:l.createdAt,
                updatedAt:l.updatedAt,
                edital:l.DetranWarning?.UnionEdital?l.DetranWarning.UnionEdital.dataValues:{},
                person:l.Person?{name:l.Person.name}:{},
                cnh:l.Person?.CNH?{number:l.Person.CNH.number}:{}
            });
        }
        res.send(JSONResponse({list:ret}));
        return;
     }catch(e){
          sendIError(req,res,e);
          return;
     }
})