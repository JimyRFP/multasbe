export enum WantHelpStatus{
    'opened'='opened',
    'callClient'='callClient',
    'selled'='selled',
    'end'='end',
}
export function stringToWantHelpStatus(str:any){
    for(let s of Object.values(WantHelpStatus)){
         if(s==str)
             return s;
    }
    return false;
}