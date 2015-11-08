'use strict';
var router = require('express').Router();
var sanitize = require("mongo-sanitize");


router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

module.exports = router;
