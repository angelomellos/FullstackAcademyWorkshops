'use strict'; 

var path = require('path');

var app = require('express')();

app.use(require('cors')());

app.use(require('./logging.middleware'));

app.use(require('./statics.middleware'));

app.use(require('./request-state.middleware'));

app.use('/api', require('../api/api.router'));

app.use(require('./error.middleware'));

module.exports = app;