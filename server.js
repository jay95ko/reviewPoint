'use strict';

const app = require('./app');
const config = require('./config');
const { sequelize } = require('./db/mysql-model');

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize Connected!!');
  } catch (e) {
    console.log('Faild Sequelize Connected!! error = ', e);
  }

  try {
    // await sequelize.sync();
  } catch (e) {
    console.log('=============sequelize sync error = ', e);
  }
};

initDB().then(() => {
  app.listen(config.port, () => {
    console.log('Express listening on port', config.port);
  });
});
