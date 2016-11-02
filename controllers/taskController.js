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

exports.delete = function(req, res, next) {
  Models.Task.findById(req.params.id)
  .then(function(task) {
    if (task) {
      return task.destroy()
    } else {
      return res.status(422).send({ error: 'No task found' })
    }
  }).then(function() {
    return res.status(200).send({ message: 'Task deleted' })
  }).catch(function(err) {
    return next(err)
  })
}

exports.update = function(req, res, next) {
  const title = req.body.title

  Models.Task.findById(req.params.id)
  .then(function(task) {
    if (task) {
      task.update({ title: title })
      .then(function(task) {
        return res.json({ task: task })
      })
    } else {
      return res.status(422).send({ error: 'No task found' })
    }
  }).catch(function(err) {
    return next(err)
  })
}