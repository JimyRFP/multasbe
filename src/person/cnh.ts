import { CNH } from "../models/cnh";
import { Person } from "../models/person";
export async function savePersonWithCNH(name:string,cnh:string,uf:string):Promise<{cnh:CNH,person:Person,isNewRecord:boolean}>{
   try{
       if(!name||!cnh)
          throw 'Must have a name and a cnh';
       let dbCNH=await CNH.findOne({where:{number:cnh},include:[Person]});
       let person=null;
       let isNewRecord=true;
       if(dbCNH&&dbCNH.Person){
           person=dbCNH.Person;
           isNewRecord=false;
           if(person.name!==name)
              throw {message:'This cnh belong to another person',cnh:dbCNH,person};
       }else{
          person=await Person.create({
            name:name,
            uf,
          });
          dbCNH=await CNH.create({
            number:cnh,
            uf,
            person_id:person.id,
          });
       }
       return {
          //@ts-ignore
          cnh:dbCNH,
          person:person,
          isNewRecord,
       }

   }catch(e){
       throw e;
   }
}