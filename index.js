const express = require('express')
const http = require('http')
const app = express()
const Sequelize = require('sequelize')

const db = new Sequelize('gp3-node-server', '', '', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

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