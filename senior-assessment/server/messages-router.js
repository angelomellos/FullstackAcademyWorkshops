var express = require('express');
var router = express.Router();
var Message = require('./models/message-model');
module.exports = router;

router.get('/to/:id', function(req, res, next){
  Message.find({to: req.params.id}).populate('from').populate('to')
  .then(function(messages){
    res.send(messages);
  }).then(null, console.log);
});

router.get('/from/:id', function(req, res, next){
  Message.getAllWhereSender(req.params.id).populate('from').populate('to')
  .then(function(messages){
    res.send(messages);
  }).then(null, console.log);
});

router.post('/', function(req, res, next){
  Message.create(req.body).
  then(function(message){
    res.status(201).send(message);
  })
});
