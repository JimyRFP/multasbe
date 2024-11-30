import { DataTypes } from "sequelize";
import {Model} from 'sequelize';
import { dataBase } from "serverpreconfigured";
import { DetranWarning } from "./detranwarning";
import { Person } from "./person";
import { WantHelpStatus } from "../notification/types";
export class WantHelp extends Model{
    declare id:number;
    declare client_phone:string;
    declare bot_phone:string;  
    declare status:WantHelpStatus;
    declare is_active:boolean;
    declare createdAt:Date;
    declare updatedAt:Date;
    declare warning_id?:number;
    declare DetranWarning?:DetranWarning;
    declare person_id:number;
    declare Person?:Person;
    


}
WantHelp.init({
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
    person_id:{
        type:DataTypes.NUMBER,
      },
    bot_phone:{
       type:DataTypes.STRING,
    },
   
    status:{
       type:DataTypes.STRING,

    },
    is_active:{
        type:DataTypes.BOOLEAN,
    },
    created_at:{
      type:DataTypes.DATE,
    }
},{
    sequelize:dataBase,
    tableName:"want_help"
});
WantHelp.belongsTo(DetranWarning,{foreignKey:'warning_id'});
WantHelp.belongsTo(Person,{foreignKey:'person_id'});