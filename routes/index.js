const express = require('express')
const router = express.Router()
const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')

const requireSignIn = passport.authenticate('local', { session: false })


router.get('/', function(req, res) {
  res.send({ text: "here" })
})

router.post('/signup', Authentication.signup)
router.post('/signin', requireSignIn, Authentication.signin)


module.exports = router