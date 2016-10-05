"use strict"
const bcrypt = require('bcrypt-nodejs')


module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    },
    instanceMethods: {
      setPassword: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
      },
      comparePassword: function(candidatePassword) {
        return bcrypt.compareSync(candidatePassword, this.password)
      }
    }
  })

  return User
}