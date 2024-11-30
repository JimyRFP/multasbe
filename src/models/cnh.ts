import { dataBase } from "serverpreconfigured";
import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import { Person } from "./person";

export class CNH extends Model{
    declare id:number;
    declare number:string;
    declare uf?:string;
    declare person_id:number;
    declare Person?:Person;
}
CNH.init({
   id:{
     type:DataTypes.NUMBER,
     primaryKey:true,
     autoIncrement:true,
   },
   number:DataTypes.STRING,
   uf:DataTypes.STRING,
   person_id:DataTypes.NUMBER,
},{sequelize:dataBase,tableName:'cnh'});
Person.hasOne(CNH);
CNH.belongsTo(Person,{foreignKey:{name:"person_id"}});