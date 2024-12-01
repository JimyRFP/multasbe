import { WANumber } from "../../models/wa";
import { phonewith9 } from "../../utils/phones";
import { whatsappSendText } from "../../whatsapp/api/sendtext";

(async ()=>{
  try{
    const wa=await WANumber.findAll();
    for(let w of wa){
        whatsappSendText(parseInt(phonewith9('554998312151')||''),'Oi bb, tudo bem?',w.phone);
    }
  }catch(e){
     console.log('error',e);
  }
})()