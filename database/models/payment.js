'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payment.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
    }
  }
  Payment.init(
    {
      reference: DataTypes.STRING,
      trfref: DataTypes.STRING,
      orderId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'payment'
    }
  );
  return Payment;
};
