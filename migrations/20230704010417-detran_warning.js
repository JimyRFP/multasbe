'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('detran_waring', { 
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
       edital_id:{
        type:Sequelize.INTEGER,
        references:{model:'union_edital',key:'id'},
        allowNull:false,
       },
       phone_warned:{
        type:Sequelize.BOOLEAN,
        defaultValue:false,
       },
       email_warned:{
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

     await queryInterface.dropTable('detran_waring');
     
  }
};
