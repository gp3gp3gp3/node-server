const jwt = require('jwt-simple')
const User = require('../models').User
const config = require('../config')

function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next) {
  res.send({ token: tokenForUser(req.user) })
}

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }

  User.findOne({ where: { email: email }})
  .then(function(existingUser) {

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    } else {

      const user = User.build({
        email: email,
        password: password
      })

      user.password = user.setPassword(password)

      user.save()
      .then(function() {
        res.json({ token: tokenForUser(user) })
      })
    }
  })
}