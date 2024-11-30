import { DetranWarning } from "../../models/detranwarning";
import { Person } from "../../models/person";
import { getShotServerPhone } from "../../shots/phone";
import { shot } from "../../shots/warningshot";

(async ()=>{
  try{
     const dw=await DetranWarning.findOne({where:{
        id:10,
     },include:[Person]});
     if(!dw||!dw.Person)
         throw "unknown warning";
     const bphone=await getShotServerPhone();
     if(!bphone)
         throw "unknoen phone";
     await shot(bphone.phone,dw,dw.Person);
  }catch(e){
      console.log(e);
  }
})()