var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('node_modules'));
app.use(function (err, req, res, next) {
    console.error(err, err.stack);
});

app.get('/',function(req,res,next){
  res.sendFile('/index.html', { root: path.join(__dirname) });
});

app.use('/users', require('./users-router.js'));
app.use('/messages', require('./messages-router.js'));
module.exports = app;
