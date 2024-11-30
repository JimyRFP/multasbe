export function phonewith9(phone:string){
  if(phone.length==13)
      return phone;
  if(phone.length==12)
      return `${phone.slice(0,4)}9${phone.slice(4)}`;
  if(phone.length==11)
     return phone;
  if(phone.length==10)
    return `${phone.slice(0,2)}9${phone.slice(2)}`;  
  return false;
}

export function phonesStringToArray(phones:string){
    if(!phones||phones=='')
        return [];
    return phones.split(',');
}
export function phonesArrayToString(phones:Array<string>){
    return phones.join(',');
}

