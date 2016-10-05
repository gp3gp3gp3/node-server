const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const routes = require('./routes/index')

app.use(bodyParser.json({ type: '*/*' }))
app.use(morgan('combined'))
app.use(cors())

app.use('/', routes)

module.exports = app