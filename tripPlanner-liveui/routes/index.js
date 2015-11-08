var express = require('express');
var router = express.Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');
var swig = require('swig');

router.get('/', function(req, res) {
  Promise.all([
    Hotel.find(),
    Restaurant.find(),
    Activity.find()
    ]).spread(function(hotels, restaurants, activities) {
      console.log(hotels);
      res.render('index', {
        all_hotels: hotels,
        all_restaurants: restaurants,
        all_activities: activities
      });
    })
})

module.exports = router;
