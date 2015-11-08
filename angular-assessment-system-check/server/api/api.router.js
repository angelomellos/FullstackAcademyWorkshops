'use strict';

var router = require('express').Router();

router.use('/things', require('./things/thing.router'));

module.exports = router;