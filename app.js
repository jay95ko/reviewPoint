'use strict';

const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const config = require('./config');

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));

require('./router')(app);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res
    .status(500)
    .send({ errorMessage: error.message, ...error });
});

module.exports = app;
