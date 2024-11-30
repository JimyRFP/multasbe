import { dataBase } from "serverpreconfigured";
import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import { Person } from "./person";

export class CnpjDatabase extends Model{
    declare id:number;
    declare server_id:number;
    declare finded:boolean;
    declare person_id:number;
    declare Person?:Person;
    declare updatedAt:Date;
    declare last_consult:Date;
}
CnpjDatabase.init({
   id:{
     type:DataTypes.NUMBER,
     primaryKey:true,
     autoIncrement:true,
   },
   server_id:DataTypes.INTEGER,
   finded:DataTypes.BOOLEAN,
   person_id:DataTypes.NUMBER,
   last_consult:DataTypes.DATE,
},{sequelize:dataBase,tableName:'cnpj_database_search'})
CnpjDatabase.belongsTo(Person,{foreignKey:{name:"person_id"}});