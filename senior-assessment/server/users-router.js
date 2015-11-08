var express = require('express');
var router = express.Router();
var User = require('./models/user-model');


router.get('/', function(req, res, next){
  User.find()
  .then(function(users){
    res.send(users);
  }).then(null, console.log)
});

router.put('/:userId', function(req, res, next){
  User.findById(req.params.userId)
  .then(function(user){
    user.email = req.body.email;
    user.save(user)
    .then(function(user){
      res.status(201).send(user);
    })
  })
});

module.exports = router;
