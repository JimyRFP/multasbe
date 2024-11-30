export enum BotState{
    clientGetInTouch='client_get_in_touch',
    sendNotification='send_notification',
    isPerson='is_person',
    notIsPerson='not_is_person',
    isCnh='is_cnh',
    notIsCnh='not_is_cnh',
    wantHelp='want_help',
    notWantHelp='not_want_help',
    humanSurport='humanSuport',
    stop='stop',
    error='error',
}

export interface BotTriggerInfo{
      botNumber:string,
      clientNumber:string,
      text:string
}