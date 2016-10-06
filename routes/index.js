const express = require('express')
const router = express.Router()
const Authentication = require('../controllers/authentication')
const passportService = require('../services/passport')
const passport = require('passport')

const requireSignIn = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })


router.get('/', requireAuth, function(req, res) {
  res.send({ message: "Secret code here ABC123" })
})

router.post('/signup', Authentication.signup)
router.post('/signin', requireSignIn, Authentication.signin)


module.exports = router