export enum WhatsAppMessageType{
    text='text',
    audio='audio',
    video='video',
    image='image',
    document='document',
    sticker='sticker',
    button='button',

}

export interface WAMessageHook{
    referral?:{
        source_url?:string,
        source_id?:string,
        source_type?:'ad',
        headline?:string,
        media_type?:'video'|'image',
        video_url?:string,
        thumbnail_url?:string,
        ctwa_clid?:string,
    },
    type:WhatsAppMessageType,
    from:string,
    timestamp:number,
    text?:{body:string},
    image?:{
        mime_type:string,
        id:string,
        sha256:string,
    },
    audio?:{
       mime_type:string,
        id:string,
        sha256:string,
        voice:boolean,
    },
    video?:{
       mime_type:string,
        id:string,
        sha256:string,
    }
    document?:{
        filename:string,
        mime_type:string,
        id:string,
        sha256:string,
    }
 }


 export interface Message{
     type:WhatsAppMessageType,
     text?:string,
 }