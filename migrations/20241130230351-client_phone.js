'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addColumn('wa_sended_template','client_phone',{
      type:Sequelize.STRING,
    }
   );
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeColumn('wa_sended_template','client_phone');
  }
};