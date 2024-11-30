import { CnpjDatabase } from "../models/cnpj_database";
import { DetranWarning } from "../models/detranwarning";
import { Person } from "../models/person";
import {Op} from 'sequelize';
import { addRowCNPJServer, getSearchedNameWithCnpjDataBase } from "./cnpj/cnpj";
import { sleep } from "../utils/sleep";
export async function searchPersonPhonesEternal(){
    try{
        await searchPersonPhones();
    }catch(e){

    }
    await sleep(60000*10);
    searchPersonPhonesEternal();
}
export async function updateFindedPersonPhonesWithCNPJEternal(){
    try{
       await updateFindedPersonPhonesWithCNPJ();
    }catch(e){

    }
    await sleep(60000*10);
    updateFindedPersonPhonesWithCNPJEternal();
}
export async function searchPersonPhones(){
    try{
       const minDate=new Date((new Date()).getTime()-(1000*60*60*24*5));
       const warnings=await DetranWarning.findAll({where:{
          created_at:{
            [Op.gte]:minDate,
          },
          phone_warned:false,
       },include:[Person],limit:1000,order:[['created_at','DESC'],['last_consult','ASC']]});
       console.log('warning len  '+warnings.length);
       for(let warning of warnings){
          warning.last_consult=new Date();
          await warning.save();
          if(!warning.Person)
              continue;
          const searchCnpj=await CnpjDatabase.findOne({where:{
              person_id:warning.Person.id,
              created_at:{
                [Op.gte]:minDate,
              }
          }});
          if(!searchCnpj){
              console.log('add '+warning.Person.name);
              await addRowCNPJServer(warning.Person);
          }else{
              
          }
       } 
    }catch(e){
       throw e;
    }
}

export async function updateFindedPersonPhonesWithCNPJ(){
  try{
    const minDate=new Date((new Date()).getTime()-(1000*60*60*24*5));
    const searchCnpj=await CnpjDatabase.findAll({where:{
        finded:false,
        created_at:{
          [Op.gte]:minDate,
        },
    },limit:1000,order:[['last_consult','ASC']],include:[Person]});
    for(let search of searchCnpj){
        search.last_consult=new Date();
        await search.save();
        await getSearchedNameWithCnpjDataBase(search);
    }
  }catch(e){
     throw e;
  }
}

