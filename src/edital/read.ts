import { sleep } from "../utils/sleep";
import { getAndSaveDetranNamesFromEditalSC } from "./detran/names";
import { unionEditalSCDownload } from "./download";
import {  hasNewEdital } from "./get";

export async function dentranReadNewEditals(){
    try{
       const lastEdital=await hasNewEdital(0);
       if(!lastEdital){
           console.log('Dont have new edital');
           return;
       }
       console.log('has new edital '+lastEdital.dsArquivo);
       const download=await unionEditalSCDownload(lastEdital);
       console.log('download ok '+download.path);
       const result=await getAndSaveDetranNamesFromEditalSC(download.db);
       console.log('save names: '+result.detran.length);
    }catch(e){
        throw e;
    }
}

export async function dentranReadNewEditalsEternal(){
   try{
      await dentranReadNewEditals();
   }catch(e){

   }
   await sleep(1000*60*60);
   dentranReadNewEditalsEternal();
}