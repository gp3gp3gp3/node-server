const express = require('express')
const router = express.Router()
const Authentication = require('../controllers/authentication')


router.get('/', function(req, res) {
  res.send({ text: "here" })
})

router.post('/signup', Authentication.signup)


module.exports = router