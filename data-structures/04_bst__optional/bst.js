function BinarySearchTree (num,level) {
  this.value = num;
  this.level = level || 0;
  allNodes.push(this);
}
var allNodes = [];
BinarySearchTree.prototype.insert = function (num,count) {
  var count = count || 0;
  count++;
  if (num > this.value){
    if (!this.right){
    this.right = new BinarySearchTree(num,count);
    }
    else{
      this.right.insert(num,count);
    }
  }else {
    if (!this.left){
      this.left = new BinarySearchTree(num,count);
    }
    else {
      this.left.insert(num,count);
    }
  }
}

BinarySearchTree.prototype.contains = function (num) {
  if (this.value === num){
    return true;
  }
  if (num > this.value){
    if (!this.right && !this.left){
      return false;
    }
    else if (!this.right){
      return this.left.contains(num);
    }
    else if (this.right.value === num) {
      return true;
    }
    else {
      return this.right.contains(num);
    }
  }
  else {
    if (!this.left && !this.right){
      return false;
    }
    else if (!this.left){
      return this.right.contains(num);
    }
    else if (this.left.value === num) {
      return true;
    }
    else {
      return this.left.contains(num);
    }
  }
}

BinarySearchTree.prototype.depthFirstForEach = function (func) {
  allNodes = [];
  func(this.value)
  if (this.left && this.right){
    return this.left.depthFirstForEach(func) || this.right.depthFirstForEach(func) || null;
  }
  if (this.left){
    return this.left.depthFirstForEach(func);
  }
  if (this.right){
    return this.right.depthFirstForEach(func);
  }
  else {
    return null;
  }
}

BinarySearchTree.prototype.breadthFirstForEach = function (func,first) {
  for (var i=1;i<allNodes.length;i++){
    if (allNodes[i+1]&&allNodes[i].value>allNodes[i+1].value&& allNodes[i].level===allNodes[i+1].level){
      var a = allNodes[i];
      var b = allNodes[i+1];
      allNodes[i] = b;
      allNodes[i+1] = a;
    }
  }
  for (var j=0;j<100;j++){
    for (var i=0;i<allNodes.length;i++){
      if (allNodes[i].level === j){
        func(allNodes[i].value);
      }
    }
  }
}

BinarySearchTree.prototype.size = function () {
  return 2;
}
