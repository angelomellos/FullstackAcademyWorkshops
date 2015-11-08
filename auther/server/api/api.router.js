'use strict';

var router = require('express').Router();
var session = require('express-session');
var passport = require('passport');

// router.use(session({
//     // this mandatory configuration ensures that session IDs are not predictable
//     secret: 'tongiscool'
// }));

router.use(function (req, res, next) {
  console.log('user', req.user);
  next();
});




router.use('/users', require('./users/user.router'));
router.use('/stories', require('./stories/story.router'));
router.use('/login', require('./login/login.router'));

router.use('/signup', require('./signup/signup.router'));





module.exports = router;
