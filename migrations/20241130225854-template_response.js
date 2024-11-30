'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addColumn('wa_sended_template','meta_response',{
      type:Sequelize.TEXT,
    }
   );
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeColumn('wa_sended_template','meta_response');
  }
};