import { dataBase } from "serverpreconfigured";
import { DataTypes } from "sequelize";
import {Model} from 'sequelize';


export class WANumber extends Model{
    declare id:number;
    declare phone:string;     
    declare phone_id:string;
    declare token:string;

    declare is_active:boolean;
    declare bm_id:string;

    declare shot_limit:number;

    
}

WANumber.init({
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
    },
    
    phone:{
       type:DataTypes.STRING,
    },
    phone_id:{
        type:DataTypes.STRING,
    },
    bm_id:{
      type:DataTypes.STRING,
    },
    shot_limit:{
        type:DataTypes.NUMBER,
    },
    token:{
        type:DataTypes.STRING,
    },
    is_active:{
        type:DataTypes.BOOLEAN
    }
},{
    sequelize:dataBase,
    tableName:"wa_number"
});
