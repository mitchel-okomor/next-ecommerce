'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    }
  }
  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: true },
      price: { type: DataTypes.STRING, allowNull: false },
      description: DataTypes.TEXT,
      image: DataTypes.TEXT,
      inStock: { type: DataTypes.INTEGER, allowNull: false }
    },
    {
      sequelize,
      modelName: 'product'
    }
  );
  return Product;
};
