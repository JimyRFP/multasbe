export function removeMultipleSpaces(str:string){
    let ret='';
    let hasSpace=false;
    for(let s of str){
          if(s==' '){
               if(hasSpace){
                  continue;
               }else{
                   hasSpace=true;
               }
          }else{
             hasSpace=false;
          }
          ret+=s;
    }
    return ret;
}
