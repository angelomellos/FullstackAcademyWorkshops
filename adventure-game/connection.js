var Connection = function(nextNode, condition) {
  this.condition = condition;
  this.nextNode = nextNode;
};

Connection.prototype.test = function (input) {
  if(this.condition === undefined){
    return true;
  }
  if (input === this.condition){
    return true;
  }
  if (input != this.condition){
    return false;
  }
}

module.exports = Connection;
