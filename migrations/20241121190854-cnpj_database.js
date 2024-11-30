'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('cnpj_database_search', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false 
       } ,  
       person_id:{
        type:Sequelize.INTEGER,
        references:{model:'person',key:'id'},
        allowNull:false,
      },
       server_id:{
         type:Sequelize.INTEGER,
         allowNull:false,
       },
       finded:{
          type:Sequelize.BOOLEAN,
          defaultValue:false,
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

     await queryInterface.dropTable('cnpj_database_search');
     
  }
};
