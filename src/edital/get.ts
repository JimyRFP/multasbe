import { UnionEdital } from "../models/ue";
import { unionEditalSCGetData } from "./link";



export async function hasNewEdital(index=0){
    try{
        const editals=await unionEditalSCGetData();
        if(editals.length<=index)
            throw "index greater then editals "+editals.length;
      const lastServer=editals[index]   
      const lastDb=await UnionEdital.findOne({where:{number:lastServer.vlNumero}})
      if(lastDb)
         return false;
      return lastServer;  
    }catch(e){
        throw e;
    }
}

