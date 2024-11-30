import { UnionEditalSC } from "./link";
import { downloadFile } from "../utils/download";
import path from 'path';
import { UnionEdital } from "../models/ue";
export function getUnionEditalLinkSC(edital:UnionEdital){
   return `https://portal.doe.sea.sc.gov.br/repositorio${edital.url}`;
}
export async function unionEditalSCDownload(edital:UnionEditalSC){
   try{
       const filePath=unionEditalGetFilePathSC(edital.vlNumero);
       const p=unionEditalGetPathSC(filePath);
       await downloadFile(`https://portal.doe.sea.sc.gov.br/repositorio${edital.dsArquivo}`,p);
       const dbEdital=await UnionEdital.create({
          number:edital.vlNumero,
          path:filePath,
          url:edital.dsArquivo,
          uf:'SC',
          aprovacao:edital.dtAprovacao,
          fechado:edital.dtFechado,
          publicacao:edital.dtPublicacao,
       });
       return {
         path:p,
         db:dbEdital,
       }
   }catch(e){
      throw e;
   }
}

export function unionEditalGetAbsPathSC(edital:UnionEdital){
   return unionEditalGetPathSC(unionEditalGetFilePathSC(edital.number));
}

export function unionEditalGetPathSC(filePath:string){
   return path.join(process.cwd(),'editals','sc',filePath);
}

export function unionEditalGetFilePathSC(editalNumber:string){
   return `${editalNumber}.pdf`;
}

