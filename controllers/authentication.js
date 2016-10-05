const User = require('../models').User

exports.signup = function(req, res, next) {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }

  User.findOne({ where: { email: email }})
  .then(function(existingUser) {
    console.log("this is existingUser", existingUser)

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    } else {

      const user = User.build({
        email: email,
        password: password
      })

      user.save()
      .then(function() {
          console.log("i'm here")
          res.json({ user: user })
      })
    }
  })
}