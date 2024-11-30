
import axios from 'axios';
import https from 'https';

export interface UnionEditalSC{
    cdJornal:number,
    cdUsuarioaprovacao:number,
    dsUsuarioaprovacao:string,
    dtPublicacao:Date,
    dtAprovacao:Date,
    dtFechado:Date,
    dsAno:string,
    vlNumero:string,
    vlDownloads:number,
    stCancelado:boolean,
    stAprovado:boolean,
    tpJornal:string,
    dsArquivo:string,
}
export async function unionEditalSCGetData(max:number=10,page:number=1){
    try{
      const agent = new https.Agent({
        rejectUnauthorized: false,
      }); 
      const now=new Date();
      let result=await axios({
        method:'GET',
        httpsAgent:agent,
        url:`https://portal.doe.sea.sc.gov.br/apis/jornal/?page=${page}&perPage=50&dtStart=2011-11-04%2000:00:00&dtEnd=${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}%2023:59:59`
        });
      if(result.data.error)
         throw {
            message:'result.data.error is not false',
            result};  
      const data=result.data.records.data;
      if(!Array.isArray(data)){
         throw{
            result,
            message:'Data is not array'
         }
      }
      let ret:Array<UnionEditalSC>=[];
      for(let d of data){
        if(ret.length>=max)
          break;
        ret.push(d);
        let index=ret.length-1;
        ret[index].dtPublicacao=new Date(ret[index].dtPublicacao);  
        ret[index].dtAprovacao=new Date(ret[index].dtAprovacao);  
        ret[index].dtFechado=new Date(ret[index].dtFechado);  
      }
      return ret;   
    }catch(e){
        throw e;
    }
}