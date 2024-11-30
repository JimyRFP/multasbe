import { dataBase } from "serverpreconfigured";
import { DataTypes } from "sequelize";
import {Model} from 'sequelize';
import { WhatsAppMessageType } from "../whatsapp/api/types";
import { LanguagesEnum } from "whatsapp_with_token/build/types/enums";
export class WAMessages extends Model{
    declare id:number;
    declare sender:string;     
    declare receiver:string;
    declare type:WhatsAppMessageType;
    declare text?:string;
    declare media_id?:string;
    declare template_name?:string;
    declare is_template:boolean;
    declare media_mime_type?:string;
    declare sender_media_link?:string;
    declare template_params_json?:string;
    declare media_caption?:string;
    declare root_server_number:string;
    declare template_lang?:LanguagesEnum;
    declare createdAt:Date;
}

WAMessages.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    sender:{
       type:DataTypes.STRING,
    },
    root_server_number:{
        type:DataTypes.STRING,
    },

    receiver:{
        type:DataTypes.STRING,
    },
    type:{
        type:DataTypes.STRING,
    },
    text:{
        type:DataTypes.STRING,
    },
    media_id:{
        type:DataTypes.STRING,
    },
    template_lang:{
        type:DataTypes.STRING,
    },
    template_name:{
        type:DataTypes.STRING,
    },
    media_mime_type:{
        type:DataTypes.STRING,
    },
    sender_media_link:{
        type:DataTypes.STRING,
    },
    template_params_json:{
        type:DataTypes.STRING,
    },
    media_caption:{
        type:DataTypes.STRING,
    },
    is_template:{
        type:DataTypes.BOOLEAN,
    },
},{
    sequelize:dataBase,
    tableName:"wa_messages"
});