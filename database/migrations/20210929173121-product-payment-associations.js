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
        'Orders', // name of Source model
        'userId', // name of the key we're adding
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users', // name of Target model
            key: 'id' // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
      .then(() => {
        // Payment hasOne Order
        return queryInterface.addColumn(
          'Orders', // name of Target model
          'paymentId', // name of the key we're adding
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'Payments', // name of Source model
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
        'Orders', // name of Source model
        'userId' // key we want to remove
      )
      .then(() => {
        // remove Payment hasOne Order
        return queryInterface.removeColumn(
          'Orders', // name of the Target model
          'paymentId' // key we want to remove
        );
      })
      .then(() => {
        // Order hasMany Product
        return queryInterface.addColumn(
          'Items', // name of Target model
          'OrderId', // name of the key we're adding
          {
            type: Sequelize.UUID,
            references: {
              model: 'Orders', // name of Source model
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        );
      });
  }
};
