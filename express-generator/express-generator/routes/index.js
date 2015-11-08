var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/books', function(req, res, next) {
  var books = {[1,2]};
  res.json(books);
});

module.exports = router;
