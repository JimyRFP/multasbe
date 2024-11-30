'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('cnh', { 
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
       number:{
         type:Sequelize.STRING,
         allowNull:false,
       },
       uf:{
          type:Sequelize.STRING,
          allowNull:true,
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

     await queryInterface.dropTable('cnh');
     
  }
};
