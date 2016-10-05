const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Sequelize = require('sequelize')
const router = require('./router')
const db = require('./models')

// Check db connection
db.sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully')
  })
  .catch(function(err) {
    console.log('Unable to connect to the database', err)
  })

// Middleware
app.use(bodyParser.json({ type: '*/*' }))
app.use(morgan('combined'))
app.use(cors())
router(app)

// Listen on port
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)