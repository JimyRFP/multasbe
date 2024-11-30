export function urlGetQueryParams(params:{[key:string]:any}){
    const entries=Object.entries(params);
    if(entries.length==0){
        return '';
    }
    let ret='?';
    for(let e of entries){
          ret=ret+`${e[0]}=${encodeURI(e[1])}&`
    }
    return ret.slice(0,ret.length-1);
}

