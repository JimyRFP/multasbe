import { CnpjListStatus } from "./list"
import { RazaoSocialInfo } from "./razao_social"
import { SocioInfo } from "./socios"

export interface SearchCompleNameAddRow{
     data: { processId: number }, 
     hasError: boolean 
}
export interface SearchCompleteNameResult{
   status:CnpjListStatus,
   result?:{
      razao_social:Array<RazaoSocialInfo>,
      socios:Array<SocioInfo>
   },
   createdAt:string,
   updatedAt:string,
   search:string,
   error?:string,
}

export interface CnpjListCompleteName{
    data: { 
       list: Array<SearchCompleteNameResult> 
    }, 
    hasError: boolean 
}