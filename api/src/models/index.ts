'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import { POSTGRES_URI } from '../util/secrets';
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; 
const db = {};

let sequelize: any;

  sequelize = new Sequelize(POSTGRES_URI);
  console.log("file")

fs
  .readdirSync(__dirname)
  .filter((file: any) => {
    console.log(file)
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts');
  })
  .forEach((file: any) => {
    console.log(file)
    const model = require(path.join(__dirname, file))(sequelize);
    console.log(model)
   // db[model.name] = model;
  });
console.log(db)
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;