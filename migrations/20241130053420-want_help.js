'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('want_help', { 
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
      warning_id:{
        type:Sequelize.INTEGER,
        references:{model:'detran_waring',key:'id'},
        allowNull:true,
       },
      bot_phone:{
         type:Sequelize.STRING,
         allowNull:false,
      },
      client_phone:{
        type:Sequelize.STRING,
      },
      status:{
        type:Sequelize.STRING,
      },
      is_active:{
        type:Sequelize.BOOLEAN,
        defaultValue:true,
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

     await queryInterface.dropTable('want_help');
     
  }
};
