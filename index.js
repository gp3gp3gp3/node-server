const express = require('express')
const http = require('http')
const app = express()
const Sequelize = require('sequelize')

const db = new Sequelize()

db.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully')
  })
  .catch(function(err) {
    console.log('Unable to connect to the database', err)
  })

const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)