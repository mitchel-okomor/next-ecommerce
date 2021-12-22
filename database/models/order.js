'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      Order.hasMany(models.Item);
    }
  }
  Order.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      paymentMethod: DataTypes.STRING,
      deliveryDate: DataTypes.DATE,
      delivered: DataTypes.BOOLEAN,
      paid: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'order'
    }
  );
  return Order;
};
