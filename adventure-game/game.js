var Node = require('./node');

var Game = function() {
  this.nodes = {};
  this.startingPoint = null;
};

Game.prototype.addNode = function (key, value) {
  var newNode = new Node(key,value);
  if (key in this.nodes){
    throw new Error();
  }
  this.nodes[key] = newNode;
  if (this.startingPoint == null){
    this.startingPoint = newNode;
  }
  return newNode;
}

Game.prototype.getNode = function (title) {
  return this.nodes[title];
}

Game.prototype.connect = function(node1,node2,circumstance) {
  if (!(node1 in this.nodes) && !(node2 in this.nodes)){
    throw new Error();
  }
  this.nodes[node1].connect(node2,circumstance);
}

module.exports = Game;
