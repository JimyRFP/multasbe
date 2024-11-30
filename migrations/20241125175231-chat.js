'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     return await queryInterface.createTable('chat', 
      { id: {
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false 
         },
        client_phone:{
          type:Sequelize.STRING,
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
        current_state:{
          type:Sequelize.STRING,
          allowNull:false,
        },
        is_active:{
          type:Sequelize.BOOLEAN,
          defaultValue:true,
        },
        fallback_number:{
           type:Sequelize.INTEGER,
           defaultValue:0,
        },
        total_messages:{
          type:Sequelize.INTEGER,
          defaultValue:0,
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
     return await queryInterface.dropTable('chat');
  }
};
