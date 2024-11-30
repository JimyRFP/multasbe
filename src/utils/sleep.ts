export function sleep(ms:number){
    return new Promise((res,req)=>{
           setTimeout(res,ms);
    })
}