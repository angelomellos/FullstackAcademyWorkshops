var express = require('express')
var bodyParser = require('body-parser');
var router = express.Router()
var todos = require('../models/todos')
module.exports = router

// WRITE SOME ROUTES HERE
router.get('/', function(req, res, next) {
  res.send(Object.keys(todo));
});

router.get('/:person?', function(req, res) {
  if (!todos.list(req.params.person).length){
    res.send(404);
  }
  person = req.params.person;
  desiredStatus = convertToBoolean(req.query.status);
  res.send(todos.list(person).filter(function(task){
    return task.complete===desiredStatus;
  }))
});

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/:person', function(req, res) {
  if (!req.body.name && !req.body.complete){
    res.send(400);
  }
  todos.add(req.params.person,req.body);
  res.status(201).send(req.body);
});

router.put('/:person/:taskNumber', function(req, res) {
  todos.complete(req.params.person,req.params.taskNumber);
  res.send();
});

router.delete('/:person/:taskNumber', function(req, res) {
  todos.remove(req.params.person,req.params.taskNumber);
  res.send(204);
});

function convertToBoolean(desiredStatus){
  if (desiredStatus==='complete'){
    boolStatus = true;
  } else {
    boolStatus = false;
  }
  return boolStatus;
}
// FEEL FREE TO SPLIT INTO MULTIPLE FILES AS NEEDED
