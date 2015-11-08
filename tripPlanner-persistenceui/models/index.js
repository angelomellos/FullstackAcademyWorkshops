var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tripPlanner');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

var CallsSchema = new mongoose.Schema({
  number: {type: Number, required: true, unique: true}//better to not error, but just skip the insert
});

module.exports = mongoose.model('Calls', CallsSchema);
