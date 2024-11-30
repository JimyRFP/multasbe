import { ChatInfo } from "./types.js";
function getChatId(from:string,to:string){
   return `${from}_${to}`;
}
export function callFnIfTimeOut(from:string,to:string,message:string,fn:(d:{from:string,to:string,message:string})=>any){
     const chatId=getChatId(from,to);
     const chatInfo=setChatInfo(chatId,from,to,message);
     const lastUpdate=chatInfo.lastUpdate;
     setTimeout(()=>sendMessageIfLast(chatId,
                                      lastUpdate),
                                      5000);
     async function sendMessageIfLast(chatId:string,lastTime:Date){
          let chat=getChatInfoById(chatId);
          if(!chat){
            return;
          }  
          if(chat.lastUpdate.getTime()!==lastTime.getTime()){
             return;
          }   
          const message=chat.messages.join(" ");
          fn({
            from:chat.from,
            to:chat.to,
            message
          });
          deleteChatById(chatId);   
     }
}

function getChatInfoById(chatId:string):ChatInfo|false{
    if(!global.chatsInfo)
      return false;
    let chat=global.chatsInfo[chatId];
    if(chat)
      return chat;
    return false;
}

function setChatInfo(chatId:string,from:string,to:string,message:string):ChatInfo{
       const now=new Date();
       if(!global.chatsInfo)
           global.chatsInfo={};
       if(!global.chatsInfo[chatId]){
          global.chatsInfo[chatId]={
              from,
              to,
              chatId,
              createdAt:now,
              lastUpdate:now,
              messages:[],
          }
       }
       global.chatsInfo[chatId].messages.push(message);
       global.chatsInfo[chatId].lastUpdate=new Date();
       return global.chatsInfo[chatId];
}

async function deleteChatById(chatId:string){
    if(!global.chatsInfo)
      return;
    delete global.chatsInfo[chatId];
}

