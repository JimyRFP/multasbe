'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     return await queryInterface.createTable('wa_messages', 
      { id: {
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false 
         },
        sender:{
          type:Sequelize.STRING,
          allowNull:false,
        },
        receiver:{
           type:Sequelize.STRING,
           allowNull:false,
        },
        type:{
          type:Sequelize.STRING,
          allowNull:false,
        },
        text:{
          type:Sequelize.TEXT,
          allowNull:true,
        },
        media_id:{
          type:Sequelize.STRING,
          allowNull:true,
        },
        is_template:{
          type:Sequelize.BOOLEAN,
          allowNull:false,
          defaultValue:false,
        },
        template_name:{
          type:Sequelize.STRING,
          allowNull:true,
        },
        sender_media_link:{
          type:Sequelize.STRING,
          allowNull:true,
        },
        template_params_json:{
          type:Sequelize.TEXT,
          allowNull:true,
        },
        media_caption:{
          type:Sequelize.TEXT,
          allowNull:true,
        },
        media_mime_type:{
          type:Sequelize.STRING,
          allowNull:true,
        },
        template_lang:{
          type:Sequelize.STRING,
          allowNull:true,
        }, 
        root_server_number:{
          type:Sequelize.STRING,
          allowNull:false,
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
     return await queryInterface.dropTable('wa_messages');
  }
};
