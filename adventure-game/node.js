var Connection = require('./connection');
var inquirer = require("inquirer");
var Node = function(title, text) {
  this.title = title;
  this.text = text;
  this.connections = new Array();
};

Node.prototype.connect = function (nodeToConnect, circumstance) {
  for (var i=0;i<this.connections.length;i++){
    if (circumstance in this.connections[i]){
      throw new Error();
    }
  }
  var obj = {};
  obj[circumstance] = nodeToConnect;
  this.connections.push(obj);
}

Node.prototype.route = function (circumstance) {
  for (var i=0;i<this.connections.length;i++){
    if (circumstance in this.connections[i]){
      return this.connections[i][circumstance];
    }
  }
}

Node.prototype.getConnectionStrings = function () {
  var arr = [];
  for (var i=0;i<this.connections.length;i++){
    arr.push(Object.keys(this.connections[i])[0]);
  }
  return arr;
}

Node.prototype.hasConnectionCondition = function (circumstance) {
  for (var i=0;i<this.connections.length;i++){
    if (circumstance in this.connections[i]){
      return true;
    }
    return false;
  }
}

module.exports = Node;
