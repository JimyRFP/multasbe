import { dataBase } from "serverpreconfigured";
import { Model } from "sequelize";
import { DataTypes } from "sequelize";
import { CNH } from "./cnh";


export class Person extends Model{
    declare id:number;
    declare name:string;
    declare cpf?:string;
    declare birth_date?:string;
    declare uf?:string;
    declare phones_array?:string;
    declare CNH?:CNH;
    
}
Person.init({
   id:{
        type:DataTypes.NUMBER,
        primaryKey:true,
        autoIncrement:true,
   },
   name:DataTypes.STRING,
   cpf:DataTypes.STRING,
   birth_date:DataTypes.STRING,
   uf:DataTypes.STRING,
   phones_array:DataTypes.STRING,
},{sequelize:dataBase,tableName:'person'});
