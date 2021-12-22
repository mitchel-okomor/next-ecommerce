'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.addColumn(
      'Payments', // name of Source model
      'orderId', // name of the key we're adding
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      'Payments', // name of Source model
      'orderId' // key we want to remove
    );
  }
};
