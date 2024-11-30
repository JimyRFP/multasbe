import { DataTypes } from "sequelize";
import {Model} from 'sequelize';
import { dataBase } from "serverpreconfigured";
import { BotState } from "../bot/types";
import { DetranWarning } from "./detranwarning";
export class BotChat extends Model{
    declare id:number;
    declare client_phone:string;
    declare bot_phone:string;  
    declare current_state:BotState;
    declare fallback_number:number;
    declare total_messages:number;
    declare is_active:boolean;
    declare createdAt:Date;
    declare updatedAt:Date;
    declare warning_id?:number;
    declare DetranWarning?:DetranWarning;

}
BotChat.init({
    id:{
      type:DataTypes.NUMBER,
      autoIncrement:true,
      primaryKey:true,
    },
    client_phone:{
      type:DataTypes.STRING,   
    },
    warning_id:{
      type:DataTypes.NUMBER,
    },
    bot_phone:{
       type:DataTypes.STRING,
    },
    current_state:{
       type:DataTypes.STRING,
    },
    total_messages:{
       type:DataTypes.NUMBER,

    },
    fallback_number:{
       type:DataTypes.NUMBER,
    },
    is_active:{
        type:DataTypes.BOOLEAN,
    },
    created_at:{
      type:DataTypes.DATE,
    }
},{
    sequelize:dataBase,
    tableName:"chat"
});
BotChat.belongsTo(DetranWarning,{foreignKey:'warning_id'});