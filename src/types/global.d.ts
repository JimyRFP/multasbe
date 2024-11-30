import { ChatInfo } from "../chat/types"
declare global{
    var chatsInfo:undefined|{[key:string]:ChatInfo}
}