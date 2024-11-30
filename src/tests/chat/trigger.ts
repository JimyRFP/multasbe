import { botTrigger } from "../../bot/trigger";

(async ()=>{
  try{
      await botTrigger({
        botNumber:'499981447777',
        clientNumber:'5549991976615',
        text:'Olá,gostaria de saber mais.'
      });
  }catch(e){
      console.log(e);
  }
})()