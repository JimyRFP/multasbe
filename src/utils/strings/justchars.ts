export function justChatsOrSpace(text:string){
   if(typeof(text)!=='string')
      return "";
   let ret="";
   for(let i=0;i<text.length;i++){
       const code=text.charCodeAt(i);
       if((code>64&&code<91)||(code>96&&code<123)){
          ret+=text[i];
       }else{
          ret+=' ';
       }
   }
   return ret;
}
