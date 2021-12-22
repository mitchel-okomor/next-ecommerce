import { responseInfo } from '../helpers/common';
import { HTTP_CREATED, HTTP_SERVER_ERROR } from '../helpers/httpCodes';
const db = require('../database/models/index');
//const Sequelize = require('sequelize');
//db.sequelize.sync();
console.log('db: ' + db);
const Products = db.Products;
export const createProduct = async (data) => {
  const { name, category, description, price, inStock, image } = data;
  try {
    const newIdea = await Products.create({
      name,
      category,
      description,
      price,
      inStock,
      image
    });

    return responseInfo(HTTP_CREATED, 'success', newIdea, 'Successful');
  } catch (err) {
    if (err) {
      console.log(err);
      return responseInfo(
        HTTP_SERVER_ERROR,
        'error',
        null,
        'A server error occured!'
      );
    }
  }
};

export const deleteIdea = async (id) => {
  try {
    const Product = await Products.destroy({
      where: {
        id: id
      }
    });

    return responseInfo(
      HTTP_CREATED,
      'success',
      newIdea,
      'Product deleted successful'
    );
  } catch (err) {
    if (err) {
      console.log(err);
      return responseInfo(
        HTTP_SERVER_ERROR,
        'error',
        null,
        'A server error occured!'
      );
    }
  }
};

export const updateProduct = async (id, productInfo) => {
  const { name, category, description, price, inStock, image } = productInfo;
  try {
    const newProduct = await Products.update(
      {
        name,
        category,
        description,
        price,
        inStock,
        image
      },
      {
        where: {
          id: id
        }
      }
    );
    console.log(newIdea);
    return responseInfo(
      HTTP_CREATED,
      'success',
      newIdea,
      'Product updated successful'
    );
  } catch (err) {
    if (err) {
      console.log(err);
      return responseInfo(
        HTTP_SERVER_ERROR,
        'error',
        null,
        'A server error occured!'
      );
    }
  }
};

export const getProducts = async () => {
  console.log('Requesting for product: ' + Products);

  try {
    const products = await Products.findAll();

    return responseInfo(HTTP_CREATED, 'success', products, '');
  } catch (err) {
    if (err) {
      console.log(err);
      return responseInfo(
        HTTP_SERVER_ERROR,
        'error',
        null,
        'A server error occured!'
      );
    }
  }
};

export const getProduct = async (id) => {
  try {
    const product = await Products.findAll({
      where: {
        userId: id
      }
    });

    return responseInfo(HTTP_CREATED, 'success', userIdeas, '');
  } catch (err) {
    if (err) {
      console.log(err);
      return responseInfo(
        HTTP_SERVER_ERROR,
        'error',
        null,
        'A server error occured!'
      );
    }
  }
};
