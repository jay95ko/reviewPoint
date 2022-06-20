'use strict';

const dotenv = require('dotenv');
dotenv.config();

const config = {
  port: process.env.PORT,
  mysql: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'triple',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: false,
    logging: true,
  },
  redis: {
    port: 6379,
    redisHost: process.env.REDIS_HOST || 'localhost',
  },
};

module.exports = config;
