import pdf from 'pdf-parse';
import meta_sanitizer from 'meta-sanitizer';
import { UnionEdital } from '../../models/ue';
import fs from 'fs';
import { DetranWarning } from '../../models/detranwarning';
import { savePersonWithCNH } from '../../person/cnh';
import { unionEditalGetAbsPathSC, unionEditalGetFilePathSC, unionEditalGetPathSC } from '../download';
export async function detranGetCNHSuspensioNames(pdfBuffer:Buffer){
    try{
        const data=await pdf(pdfBuffer);
        let {text}=data;
        text=text.toUpperCase();
        //@ts-ignore
        text=text.replaceAll('\n',' ');
        //@ts-ignore
        text=text.replaceAll('  ',' ');
        //@ts-ignore
        text=text.replaceAll('- ','');
        text=removeMultipleSpaces(text);
        let lastindex=0;
        const searchText='PORTADOR(A) DA CNH';
        let ret=[];
        let inn=0;
        while(1){
            lastindex=text.indexOf(searchText);
            if(lastindex<0)
              break;
            ret.push({
                    name:getName(text,lastindex),
                    cnh:getCNH(text,lastindex),
            });
            text=text.slice(lastindex+searchText.length,);
        }
        return ret;
        
    }catch(e){
        throw e;
    }
    function getName(text:string,sIndex:number){
        let index=sIndex;
        while(index>0){
            if(text[index]===';'||text[index]===':'||text[index]==')')
               break;   
            index--;   
        }
        let ret=text.slice(index+1,sIndex);
        ret=meta_sanitizer.ExcluderEngine(ret,[',']);
        ret=ret.trim();
        return ret;
    }
    function getCNH(text:string,sIndex:number){
        let index=sIndex;
        while(index>0){
            if(text[index]===',')
               break;   
            index++;   
        }
        let ret=text.slice(sIndex,index);
        ret=meta_sanitizer.justNumbers(ret,false);
        return ret;
    }
}



function removeMultipleSpaces(text:string){
   let ret='';
   let haveSpace=false;
   for(let i=0;i<text.length;i++){
      if(text[i]==' '){
        if(haveSpace)
          continue;
        ret+=' ';
        haveSpace=true;  
        continue;
      }
      ret+=text[i];
      if(haveSpace)
        haveSpace=false;
   }
   return ret;
}


export async function getAndSaveDetranNamesFromEditalSC(edital:UnionEdital){
    try{
       const path=unionEditalGetAbsPathSC(edital);
       const buffer=fs.readFileSync(path);
       const detran=await detranGetCNHSuspensioNames(buffer);
       let erros=[];
       let warings:Array<DetranWarning>=[];
       for(let name of detran){
        try{
           let spr=await savePersonWithCNH(name.name,name.cnh,'SC');
           let has=await DetranWarning.findOne({where:{
              person_id:spr.person.id,
              edital_id:edital.id,
           }});
           if(has){
                throw 'has this warning';
           }  
           let waring=await DetranWarning.create({
              person_id:spr.person.id,
              edital_id:edital.id,
           });
           warings.push(waring);
        }catch(e){
           erros.push(e);
        } 
     }
     return {
        detran,
        warings,
        erros,
     }
    }catch(e){
        throw e;
    }
}