var router = require('express').Router();
var path = require('path');
var bodyParser = require('body-parser');
var User = require('../users/user.model');
var passport = require('passport');

router.post('/', function (req, res, next) {
  User.findOne({email: req.body.email}).exec().then(function(user){
    if(user && user.password===req.body.password){
      passport.session = req.session.userId
      req.session.userId = user._id;
      res.status(200).json(user);
    }else{
      res.status(401).send('wrong username or password');
    }
  }).then(null,console.log)
});
module.exports = router;


router.get('/logout', function (req,res,next) {
  console.log("hit logout route on back end!")
  req.session.destroy();
  res.send("successful logout")
})
