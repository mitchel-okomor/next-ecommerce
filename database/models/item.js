'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
      Item.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });
    }
  }
  Item.init(
    {
      quantity: DataTypes.INTEGER,
      orderId: { type: DataTypes.INTEGER, allowNull: false },
      productId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'item'
    }
  );
  return Item;
};
