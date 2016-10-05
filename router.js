const Authentication = require('./controllers/authentication')

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send({ text: "here" })
  })
  app.post('/signup', Authentication.signup)
}