'use strict';

const glob = require('glob');
const path = require('path');

const importModule = (app) => {
  try {
    glob.sync('**/*.js', { cwd: './router', ignore: ['index.js'] }).forEach((f) => {
      app.use(`/${f.slice(0, -3)}/`, require(path.join(__dirname, f))); // eslint-disable-line global-require
    });
  } catch (e) {
    console.log('========== Router v1 importModule error ========= ', e);
    throw e;
  }
};

module.exports = importModule;
