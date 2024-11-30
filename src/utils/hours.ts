export function dateGetLastDateOfDay(date:Date){
    let ret=new Date(date);
    ret.setUTCHours(23);
    ret.setUTCMinutes(59);
    ret.setUTCSeconds(59);
    ret.setUTCMilliseconds(999);
    return ret;
 }
 export function dateGetFirstDateOfDay(date:Date){
     let ret=new Date(date);
     ret.setUTCHours(0);
     ret.setUTCMinutes(0);
     ret.setUTCSeconds(0);
     ret.setUTCMilliseconds(0);
     return ret;
 }
 
 export function getPtUTCDateString(date:Date){
    return `${addZ(date.getUTCDate())}/${addZ(date.getUTCMonth()+1)}/${date.getUTCFullYear()} ${addZ(date.getUTCHours())}:${addZ(date.getUTCMinutes())}:${addZ(date.getUTCMinutes())} UTC`;
    function addZ(v:number){
       if(v>9)
          return v.toString();
       return `0${v}`;  
    }
 }