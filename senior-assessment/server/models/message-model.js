var mongoose = require('mongoose');
var User = require('./user-model');

var schema = new mongoose.Schema({
  subject: {type: String, default: 'No Subject'},
  body: {type: String, required: true},
  from: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  to: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

schema.statics.getAllWhereSender = function(senderId){
  return this.where({from: senderId}).populate('to').populate('from');
};

schema.methods.truncateSubject = function(len, ell) {
  this.subject = this.subject.slice(0,len);
  if (ell) this.subject += '...';
  return this;
};

module.exports = mongoose.model('Message', schema);
