var express = require('express');
var router = express.Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Day = models.Day;
var Promise = require('bluebird');


router.get('/findAll', function(req, res, next) {
  Day.find({}).exec(function(err, day) {
    if (err) return new Error;
    res.json({day: day});
  })
})

router.post('/deleteDay', function(req, res, next) {
  id = req.body.id;
  Day.findById(id,function (err, day){
    if (err) return new Error();
    day.remove(function(err,day){
      res.send(200);
    })
  })
})

router.post('/createDay', function(req, res, next) {
  Day.find({}).exec(function(err, day) {
    if (err) return new Error;
    return numDays = day.length;
  }).then(function(param1, param2, param3) {
    Day.create({number: numDays + 1}).then(function(day) {
      res.json({day: day})
    });
    return;
    res.send(200);
  });
});

router.put('/:id/addAttraction', function(req, res, next) {
  Day.find({number: req.body.day.slice(0,1)}).exec().then(function(day){
    day = day[0];
    day[req.body.type].push(req.params.id);
    day.save(function(err,res){
      if (err) res.send(new Error('err'));
      res.send(200);
    },console.log);
  })
});

// router.get('/', function(req, res) {
  // Promise.all([
  //   Hotel.find(),
  //   Restaurant.find(),
  //   Activity.find()
  //   ]).spread(function(hotels, restaurants, activities) {
  //     res.render('index', {
  //       all_hotels: hotels,
  //       all_restaurants: restaurants,
  //       all_activities: activities
  //     });
  //   })
// })

module.exports = router;
