'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('person', { 
      id: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false 
       } ,  
       cpf: {
        type:Sequelize.STRING,
        allowNull:true 
       },
       name:{
          type:Sequelize.TEXT,
          allowNull:false,
       },
       birth_date:{
        type:Sequelize.DATE,
        allowNull:true,
       },
       uf:{
        type:Sequelize.STRING,
       },
       phones_array:{
        type:Sequelize.TEXT,
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

     await queryInterface.dropTable('person');
     
  }
};
