// Make sue your `mongod` process is running!
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assessjs');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));
//---------VVVV---------  your code below  ---------VVV----------
function tagGetter (value){
  if (value.length)
    return value.join(', ');
}

var articleSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  tags: {type: Array, get: tagGetter}
});


articleSchema.virtual('snippet').get(function () {
  return this.content.slice(0,23)+'...';
});

articleSchema.methods.truncate = function (len) {
  this.content = this.content.slice(0,len);
};

articleSchema.statics.findByTitle = function (title, cb) {
  return this.findOne({title: title},cb);
};


//---------^^^---------  your code above  ---------^^^----------
var Article = mongoose.model('Article', articleSchema);
module.exports = Article;
