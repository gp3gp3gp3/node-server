const express = require('express')
const router = express.Router()
const Authentication = require('../controllers/authentication')
const Tasks = require('../controllers/taskController')
const passportService = require('../services/passport')
const passport = require('passport')

const requireSignIn = passport.authenticate('local', { session: false })
const requireAuth = passport.authenticate('jwt', { session: false })


router.get('/', requireAuth, Tasks.index)
router.post('/', requireAuth, Tasks.create)
router.delete('/tasks/:id', requireAuth, Tasks.delete)
router.put('/tasks/:id', requireAuth, Tasks.update)

router.post('/signup', Authentication.signup)
router.post('/signin', requireSignIn, Authentication.signin)


module.exports = router