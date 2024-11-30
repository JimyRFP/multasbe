import { dataBase } from "serverpreconfigured";
import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import { Person } from "./person";
import { UnionEdital } from "./ue";

export class DetranWarning extends Model{
    declare id:number;
    declare person_id:number;
    declare edital_id:number;
    declare email_warned:boolean;
    declare phone_warned:boolean;
    declare updatedAt:Date;
    declare UnionEdital?:UnionEdital;
    declare Person?:Person;
    declare last_consult:Date;
}
DetranWarning.init({
   id:{
     type:DataTypes.NUMBER,
     primaryKey:true,
     autoIncrement:true,
   },
   person_id:DataTypes.NUMBER,
   edital_id:DataTypes.NUMBER,
   phone_warned:DataTypes.BOOLEAN,
   email_warned:DataTypes.BOOLEAN,

   last_consult:DataTypes.DATE,
},{sequelize:dataBase,tableName:'detran_waring'})
DetranWarning.belongsTo(Person,{foreignKey:{name:"person_id"}});
DetranWarning.belongsTo(UnionEdital,{foreignKey:{name:"edital_id"}});