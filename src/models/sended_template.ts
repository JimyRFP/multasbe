import { DataTypes } from "sequelize";
import {Model} from 'sequelize';
import { dataBase } from "serverpreconfigured";
export class WATemplateSended extends Model{
    declare id:number;
    declare template_name:string;     
    declare template_lang:string;
    declare phone:string;
    declare params?:string;
    declare is_active:boolean;
    declare status_code:number;
    declare meta_response:string;
    declare client_phone:string;
}

WATemplateSended.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    phone:{
        type:DataTypes.STRING,
     },
    template_name:{
       type:DataTypes.STRING,
    },
    status_code:{
       type:DataTypes.NUMBER,
    },
    meta_response:{
       type:DataTypes.STRING,
    },
    client_phone:{
      type:DataTypes.STRING,
    },
    template_lang:{
        type:DataTypes.STRING,
    },
    params:{
        type:DataTypes.STRING,
    },
    is_active:{
        type:DataTypes.BOOLEAN,
    }
},{
    sequelize:dataBase,
    tableName:"wa_sended_template"
});

