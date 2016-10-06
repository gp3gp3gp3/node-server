const Models = require('../models')

exports.index = function(req, res, next) {
  req.user.getTasks()
  .then(function(tasks) {
    if (tasks) {
      return res.json({ tasks: tasks })
    } else {
      return res.status(422).send({ error: 'No tasks found'})
    }
  })
  .catch(function(err) {
    return next(err)
  })
}

exports.create = function(req, res, next) {
  const title = req.body.title

  if(!title) {
    return res.status(422).send({ error: "You must provide a title"})
  }
  Models.Task.create({
    title: title,
    UserId: req.user.get('id')
  }).then(function(task) {

    res.json({ task: task })
  })
  .catch(function(err) {
    return next(err)
  })
}