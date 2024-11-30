import { dataBase } from "serverpreconfigured";
import { Model } from "sequelize";
import { DataTypes } from "sequelize";

export class UnionEdital extends Model{
    declare id:number;
    declare number:string;
    declare path:string;
    declare url:string;
    declare uf:string;
    declare aprovacao:Date;
    declare fechado:Date;
    declare publicacao:Date;
}
UnionEdital.init({
   id:{
    type:DataTypes.NUMBER,
    primaryKey:true,
    autoIncrement:true,
   }, 
   number:DataTypes.STRING,
   path:DataTypes.STRING,
   url:DataTypes.STRING,
   uf:DataTypes.STRING,
   aprovacao:DataTypes.DATE,
   fechado:DataTypes.DATE,
   publicacao:DataTypes.DATE,

},{sequelize:dataBase,tableName:'union_edital'})