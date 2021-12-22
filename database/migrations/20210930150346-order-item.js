'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface
      .addColumn(
        'Items', // name of Source model
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
      )
      .then(() => {
        // Payment hasOne Order
        return queryInterface.addColumn(
          'Items', // name of Target model
          'productId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Products', // name of Source model
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        );
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface
      .removeColumn(
        'Items', // name of Source model
        'orderId' // key we want to remove
      )
      .then(() => {
        // Order hasMany Product
        return queryInterface.addColumn(
          'Items', // name of Target model
          'productId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Products', // name of Source model
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        );
      });
  }
};
