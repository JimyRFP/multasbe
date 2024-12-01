import { WANumber } from "../../models/wa"
import { phonewith9 } from "../../utils/phones";
import { waSendAskIsPerson1 } from "../../whatsapp/api/templates/call_link";

(async ()=>{
  try{
    const wa=await WANumber.findAll();
    for(let w of wa){
        waSendAskIsPerson1(w.phone,'NATHAN ZANGELINI OLIVEIRA',phonewith9('5549998312151')||'');
    }
  }catch(e){
    console.log('Error',e);
  }
})()