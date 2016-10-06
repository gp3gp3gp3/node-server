const passport = require('passport')
const User = require('../models').User
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')

const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {

  // find user with email
  User.findOne({ where: { email: email }})
  .then(function(existingUser) {
    if(!existingUser) { return done(null, false) }
  // run compare password with password argument
    if (existingUser.comparePassword(password)) {
      return done(null, existingUser)
    } else {
      return done(null, false)
    }
  })
  .catch(function(err) {
    return done(null, err)
  })
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub)
  .then(function(user) {
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
  .catch(function(err) {
    return done(err, false)
  })
})

passport.use(localLogin)
passport.use(jwtLogin)