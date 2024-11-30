import axios from "axios";
import fs from 'fs';
import https from 'https';
export async function downloadFile(url:string,path:string):Promise<string>{
    try{
        const agent = new https.Agent({
            rejectUnauthorized: false,
          }); 
        const response = await axios({
            url,
            httpsAgent:agent,
            method: 'GET',
            responseType: 'stream'
          });
          if(response.status!==200)
             throw response;
          const writer = fs.createWriteStream(path);   
          response.data.pipe(writer);
          return new Promise((resolve, reject) => {
           writer.on('finish',()=>resolve(path))
           writer.on('error', (e)=>reject(e))
         });
    }catch(e){
       throw e;
    }
}