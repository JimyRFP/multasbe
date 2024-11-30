import { CnpjDatabase } from "../../models/cnpj_database";
import { Person } from "../../models/person";
import { phonesArrayToString, phonesStringToArray, phonewith9 } from "../../utils/phones";
import { getCNPJAPI } from "./api";
import { CnpjListStatus } from "./api/types/list";

export async function addRowCNPJServer(person:Person){
   try{
       const api=getCNPJAPI();
       const r=await api.searchCompleteNameAddRow(person.name);
       return await CnpjDatabase.create({
          person_id:person.id,
          server_id:r.data.processId,
          fidned:false,
       });
   }catch(e){
      throw e;
   }
}
export async function getSearchedNameWithCnpjDataBase(db:CnpjDatabase){
  try{
      let person:null|undefined|Person=db.Person;
      if(!person){
          person=await Person.findOne({where:{id:db.id}});
          if(!person)
             throw "unknoen person";
      }
      const api=getCNPJAPI();
      const list=await api.searchCompleteNameList({id:db.server_id});
      if(list.data.list.length<1)
         throw "Unknown search";
      let finded=list.data.list[0];

      if(finded.status==CnpjListStatus.processing||finded.status==CnpjListStatus.created){
         db.updatedAt=new Date();
         await db.save();
         return;
      }
      console.log(finded.search,finded.status,db.Person?.name);
      db.finded=true;
      
      if(finded.status==CnpjListStatus.success&&finded.result){
           let phones:Array<string>=[];
           for(let rs of finded.result.razao_social){
                const cnpj=await api.cnpj(rs.cnpj);
                if(!isUf(person.uf||'',cnpj.data.address))
                    continue;
                phones=phones.concat(getPhones(cnpj.data.phones));
           }
           const oldPhones=phonesStringToArray(person.phones_array||'');
           console.log(oldPhones,phones);
           if(phones.length>0){
               let addPhones=oldPhones.concat(phones);
               let uniquePhones=[...new Set(addPhones)];
               console.log(uniquePhones);
               person.phones_array=phonesArrayToString(uniquePhones);
               await person.save();
           }
      }
      await db.save();

  }catch(e){
     throw e;
  }
  function getPhones(phones:Array<{ddd:string,phone:string}>){
         let ret=[];
         for(let f of phones){
              let phone=phonewith9(`55${f.ddd}${f.phone}`);
              if(!phone)
                 continue;
              ret.push(phone);
         }
         return ret;
  }
  function isUf(uf:string,end:Array<{uf:string}>){
    let buf=uf.toLowerCase();
    for(let e of end){
        if(!e.uf)
             continue;
        if(buf==e.uf.toLowerCase())
            return true;
    }
    return false;
  }
}

