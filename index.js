const express = require('express')
const http = require('http')
const app = express()
const Sequelize = require('sequelize')
const router = require('./router')
const db = require('./models')

db.sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully')
  })
  .catch(function(err) {
    console.log('Unable to connect to the database', err)
  })

router(app)

const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)