var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trip-planner');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
  address: String,
  city: String,
  state: String,
  phone: String,
  location: [Object],
  hotel: String,
})

var hotelSchema = new Schema({
  name: String,
  place: String,
  num_starts: Number,
  amenities: [String],
  activity: String,
})

var activitySchema = new Schema({
  name: String,
  place: String,
  age_range: String,
})

var restaurantSchema = new Schema({
  name: String,
  place: String,
  cuisines: [String],
  price: Number,
  picUrl: String,
})

var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var Activity = mongoose.model('Activity', activitySchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);


module.exports =   {
  Place: Place,
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant,
};
