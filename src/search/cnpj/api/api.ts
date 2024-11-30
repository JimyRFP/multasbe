import axios from "axios";
import { CnpjListCompleteName, SearchCompleNameAddRow } from "./types/completename";
import {  urlGetQueryParams } from "../../../utils/urlparam";
import {  CnpjListStatus } from "./types/list";
import { CNPJCompleteInfo } from "./types/cnpj";

export class CNPJSearchApi{
    declare __authorization:string;
    declare __userId:number;
    constructor(userId:number,authorization:string){
       this.__authorization=authorization;
       this.__userId=userId;
    }
    __getUrl(path:string){
        return `https://cnpj.iatechcloud.com/${path}`;
    }
    async searchCompleteNameAddRow(name:string):Promise<SearchCompleNameAddRow>{
        const url=this.__getUrl(`api/name/complete/row/${encodeURI(name)}`);
        try{
           const req=await this.sendAuthenticatedRequest("POST",url);
           return req.data;
        }catch(e){
            throw e;
        }

    }
    async searchCompleteNameList(params?:{status?:CnpjListStatus,id?:number}):Promise<CnpjListCompleteName>{
        const url=await this.__getUrl(`api/name/complete/list${urlGetQueryParams(params||{})}`);
        try{
           const req=await this.sendAuthenticatedRequest('GET',url);
           return req.data;
        }catch(e){
            throw e;
        }
    }
    async cnpj(cnpj:string):Promise<CNPJCompleteInfo>{
        const url=this.__getUrl(`api/cnpj/${cnpj}`)
        try{
           const req=await this.sendAuthenticatedRequest('GET',url);
           return req.data;
        }catch(e){
            throw e;
        }
    }
    async sendAuthenticatedRequest(method:'POST'|'GET',url:string,data?:any){
        try{
            const request=await axios({
                method:method,
                url,
                data:data?JSON.stringify(data):null,
                headers:{'Authorization': this.__authorization,
                         'Content-Type':'application/json',
                         'x-user-id':this.__userId,
                        },
               });
            return request;   
        }catch(e){
            throw e;
        }
    }
} 


