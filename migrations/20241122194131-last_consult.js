'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return await queryInterface.addColumn('detran_waring','last_consult',{
      type:Sequelize.DATE,
      allowNull:false,
      defaultValue:'2016-01-01T00:00:00-00:00'
    }
   );
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.removeColumn('detran_waring','last_consult');
  }
};