import { removeAccentuation } from "../utils/strings/accents";
import { justChatsOrSpace } from "../utils/strings/justchars";
import { removeMultipleSpaces } from "../utils/strings/space";

const positive=['sim','quero','pode ser','confirmar','sou eu','sim, sou eu','eu mesmo','s','e','ss','e sim'];
const negative=['nao','nao sou','nao conheco','melhor nao','nao sou eu','nao e','nao quero','cancela','sair','nn'];

export function afirmationResult(text:string):'positive'|'negative'|'undetermined'{
   let cleantext=removeAccentuation(text);
   cleantext=cleantext.toLowerCase();
   cleantext=justChatsOrSpace(cleantext);
   cleantext=removeMultipleSpaces(cleantext);
   cleantext=cleantext.trim();
   console.log(cleantext);
   if(cleantext.length>50||cleantext.length<1)
      return 'undetermined';
   for(let p of positive){
     if(cleantext===p)
         return 'positive';
   }
   for(let n of negative){
     if(cleantext===n)
         return 'negative';
   }
   return 'undetermined';
}

