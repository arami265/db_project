const Sequelize = require('sequelize');

//DB config
const dbURI = require('./keys').amazonURI;
const dbPass = require('./keys').amazonPass;

//Connect to DB
module.exports = new Sequelize('main', 'admin', dbPass, {
    host: dbURI,
    dialect: 'mysql',
    define: {timestamps: false}
  });