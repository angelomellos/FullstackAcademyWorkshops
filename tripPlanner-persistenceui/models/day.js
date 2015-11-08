var mongoose = require('mongoose');
require('./hotel.js');
require('./restaurant.js');
require('./activity.js');

var DaySchema = new mongoose.Schema({
  number: {type: Number, required: true},
  hotel: {type: mongoose.Schema.Types.ObjectId, ref: 'Hotel'},
  restaurants: {type: [mongoose.Schema.Types.ObjectId], ref:'Restaurant'},
  activities: {type: [mongoose.Schema.Types.ObjectId], ref: 'Activity'},
})

module.exports = mongoose.model('Day', DaySchema);
