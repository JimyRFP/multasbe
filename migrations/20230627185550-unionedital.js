'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('union_edital', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false 
       } ,  
       number:{
         type:Sequelize.STRING,
         allowNull:false,
       },
       uf:{
          type:Sequelize.STRING,
          allowNull:false,
       },
       path:{
         type:Sequelize.STRING,
         allowNull:false,
       },
       url:{
        type:Sequelize.TEXT,
        allowNull:false,
       },
       aprovacao:{
         type:Sequelize.DATE,
       },
       publicacao:{
          type:Sequelize.DATE,
       },
       fechado:{
          type:Sequelize.DATE,
       },
       created_at:{
          type:Sequelize.DATE,
          allowNull:false,
        },
        updated_at:{
          type:Sequelize.DATE,
          allowNull:false,
        },
      });
     
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('union_edital');
     
  }
};
