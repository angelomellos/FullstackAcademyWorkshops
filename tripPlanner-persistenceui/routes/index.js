var express = require('express');
var router = express.Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Day = models.Day;
var Activity = models.Activity;
var Promise = require('bluebird');

router.get('/', function(req, res) {
  Promise.all([
    Hotel.find(),
    Restaurant.find(),
    Activity.find(),
    Day.find(),
  ]).spread(function(hotels, restaurants, activities, days) {
      res.render('index', {
        all_hotels: hotels,
        all_restaurants: restaurants,
        all_activities: activities,
        all_days: days,
      });
    })
})

module.exports = router;
