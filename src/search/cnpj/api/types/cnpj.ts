import { RazaoSocialInfo } from "./razao_social"
import { SocioInfo } from "./socios"

export interface CNPJCompleteInfo{
    data:{
        cnpj:{
            cnpj:string,
            cnpj_dv:string,
            cnpj_type:string,
            cnpj_base:string
        }
        emails:Array<{email:string}>,
        phones:Array<{phone:string,ddd:string}>,
        partners:Array<SocioInfo>,
        razao_social:Array<RazaoSocialInfo>,
        nome_fantasia:Array<{nome_fantasia:string}>,
        address:[{uf:string,street:string,street_number:string,cep:string,neighborhood:string,complement:string}]
    },
    hasError:boolean
}