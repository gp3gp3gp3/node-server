'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/config.json')[env];
var db        = {};

console.log("***************************************************")
console.log("I'm the config object", config)
console.log("I'm the DATABASE_URL", process.env.DATABASE_URL)
console.log("***************************************************")

if (config.use_env_variable) {
  console.log("***************************************************")
  console.log("I'm in the heroku server process, problem is not DATABASE_URL env variable")
  console.log("***************************************************")
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true
  });
} else {
  console.log("***************************************************")
  console.log("I'm in the else block, problem is DATABASE_URL is not being accessed")
  console.log("***************************************************")

  // var sequelize = new Sequelize(config.database, config.username, config.password, config);
  var sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: true
  });
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
