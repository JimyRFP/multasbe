'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     return await queryInterface.createTable('wa_sended_template', 
      { id: {
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false 
         },
        phone:{
          type:Sequelize.STRING,
        },
        template_name:{
           type:Sequelize.STRING,
           allowNull:false,
        },
        template_lang:{
          type:Sequelize.STRING,
          allowNull:false,
       },
        params:{
           type:Sequelize.TEXT,
           allowNull:true,
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
     return await queryInterface.dropTable('wa_sended_template');
  }
};
