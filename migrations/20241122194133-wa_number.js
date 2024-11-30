'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     return await queryInterface.createTable('wa_number', 
      { id: {
           type:Sequelize.INTEGER,
           primaryKey:true,
           autoIncrement:true,
           allowNull:false 
         },
        phone:{
           type:Sequelize.STRING,
           allowNull:false,
        },
        token:{
          type:Sequelize.TEXT,
          allowNull:false,
       },
        phone_id:{
           type:Sequelize.STRING,
           allowNull:false,
        },
        bm_id:{
          type:Sequelize.STRING,
          allowNull:false,
        },
        is_active:{
          type:Sequelize.BOOLEAN,
          defaultValue:true,
        },
        shot_limit:{
          type:Sequelize.INTEGER,
          defaultValue:250,
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
     return await queryInterface.dropTable('wa_number');
  }
};
