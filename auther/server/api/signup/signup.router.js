var router = require('express').Router();
var path = require('path');
var User = require('../users/user.model');

router.post('/', function (req, res, next) {
  console.log('REQ BDOY IS signup !!!!!!!!!!!!',req.body);
  User.findOne({email: req.body.email}).exec().then( function (user){
    if(user){
      console.log("user!", user)
      res.status(401).send('that user already exists!');
    }else{
      console.log("user created!")
      req.session.userId = user._id;
      User.create(req.body).then(function (user) {
      console.log(user)
      res.status(200).json(user);
      })
      .then(null, function() {
        console.log("hit Error!")
      })
    }
  });
});
module.exports = router;