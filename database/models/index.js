'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
import userModel from './user';
import productModel from './product';
import categoryModel from './category';
import itemModel from './item';
import orderModel from './order';
import paymentModel from './payment';

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

//IIFE to test connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      `Successfully connected to database ${config.database} at ${config.username}@${config.host}`
    );
    if (process.env.NODE_ENV === 'development') {
      //sync models
      //Note: only uncomment when needed! Pass 'true' as argument to run a fresh sync
      // syncModels(true);
    }
  } catch (error) {
    console.error('Could not establish database connection:', error);
  }
})();

/**
 * Synchronize models
 * @param {boolean} fresh - if true, will run sync and seed tables, otherwise it will just run sync
 */
const syncModels = async (fresh = false) => {
  try {
    if (fresh) {
      //sync tables
      await sequelize.sync({ force: false });
      console.log('All models were synchronized successfully.');
      //navigate to root and seed tables
      // const root = path.join(__dirname, '../../');
      // exec(
      //   'npx sequelize-cli db:seed:all',
      //   { cwd: root },
      //   (error, stdout, stderr) => {
      //     //do xyz...
      //     if (error) throw error;
      //     console.log('Seeds run successfully!');
      //   }
      // );
    } else {
      await sequelize.sync({ alter: false });
      console.log('All models were synchronized successfully.');
    }
  } catch (error) {
    console.error('Database sync failed:', error);
  }
};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    console.info('file: ' + __dirname);

    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
syncModels(false);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Users = userModel(sequelize, Sequelize);
db.Products = productModel(sequelize, Sequelize);
db.Categories = categoryModel(sequelize, Sequelize);
db.Items = itemModel(sequelize, Sequelize);
db.Orders = orderModel(sequelize, Sequelize);
db.Payments = paymentModel(sequelize, Sequelize);
// sequelize.addModels([
//   userModel,
//   categoryModel,
//   productModel,
//   itemModel,
//   orderModel,
//   paymentModel
// ]);

module.exports = db;
