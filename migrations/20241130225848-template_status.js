'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addColumn('wa_sended_template','status_code',{
      type:Sequelize.INTEGER,
      allowNull:false,
      defaultValue:200,
    }
   );
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeColumn('wa_sended_template','status_code');
  }
};