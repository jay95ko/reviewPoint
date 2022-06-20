'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes, Model } = require('sequelize');
const config = require('../../config');
const baseName = path.basename(__filename);

const db = {};

const {
  username, password, database, port, host,
} = config.mysql;
const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host,
    dialect: 'mysql',
  },
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(__dirname).forEach((file) => {
  if (path.extname(file) === '.js' && file !== baseName) {
    const filePath = path.join(__dirname, file);
    const r = require(filePath)(sequelize, DataTypes, Model); // eslint-disable-line

    if (r) db[r.name] = r;
  }
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
