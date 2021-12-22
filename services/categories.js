import { responseInfo } from '../helpers/common';
import { HTTP_CREATED, HTTP_SERVER_ERROR } from '../helpers/httpCodes';
const { models } = require('../database/models');
//const Sequelize = require('sequelize');
//db.sequelize.sync();

const Categories = models.Categories;
console.log(Categories);
export const createCategory = async (data) => {
  const { name } = data;
  try {
    const newCategory = await Categories.create({
      name
    });

    return responseInfo(HTTP_CREATED, 'success', newCategory, 'Successful');
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

export const deleteCategory = async (id) => {
  try {
    const Category = await Categories.destroy({
      where: {
        id: id
      }
    });

    return responseInfo(
      HTTP_CREATED,
      'success',
      newIdea,
      'Category deleted successful'
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

export const updateCategory = async (id, info) => {
  const { name } = info;
  try {
    const newCategory = await Categories.update(
      {
        name
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
      newCategory,
      'Category updated successful'
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
  try {
    const products = await Categories.findAll();

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

export const getCategories = async () => {
  try {
    const Categories = await Categories.findAll();

    return responseInfo(HTTP_CREATED, 'success', Categories, '');
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
