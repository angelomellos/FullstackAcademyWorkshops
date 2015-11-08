function createArgumentMap(){
  var obj = {};
  for (var i=0;i<arguments.length;i++){
    obj["a"+i] = arguments[i];
  }
  return obj;
}

function keyAdder (obj) {
  total = 0;
  for (var key in this){
    if (Number.isInteger(this[key]) && this.hasOwnProperty(key))
        total += this[key];

  }
  return total;
}
