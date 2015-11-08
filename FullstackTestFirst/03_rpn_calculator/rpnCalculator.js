function RPNCalculator(){
  this.queue = [];
  this.total = 0;

function popAndTest() {
  this.emptyTest();
  var first = this.queue.pop();
  var second = this.queue.pop();
  return [first,second];
}
RPNCalculator.prototype.emptyTest = function(){
  if (this.queue.length < 1){
    throw "rpnCalculator is empty";
  }
}
RPNCalculator.prototype.push = function(a){this.queue.push(a);}
RPNCalculator.prototype.plus = function(){
  var popped = popAndTest.call(this);
  this.total = popped[0] + popped[1];
  this.push(this.total);
}
RPNCalculator.prototype.value = function() {return this.total;}
RPNCalculator.prototype.minus = function(){
  var popped = popAndTest.call(this);
  this.total = popped[1] - popped[0];
  this.push(this.total);
}
RPNCalculator.prototype.divide = function(){
  var popped = popAndTest.call(this);
  this.total = popped[1] / popped[0];
  this.push(this.total);
}

RPNCalculator.prototype.times = function(){
  var popped = popAndTest.call(this);
  this.total = popped[0] * popped[1];
  this.push(this.total);
}
}
