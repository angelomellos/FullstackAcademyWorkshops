function setPropertiesOnObjLiteral(obj){
  obj.x = 7;
  obj.y = 8;
  obj.onePlus = function(a){
    return a + 1;
  };
}

function setPropertiesOnArrayObj(arr){
  arr.hello = function() {return "Hello!"};
  arr.full = "stack";
  arr[0] = 5;
  arr.twoTimes = function(a){return a * 2};
}

function setPropertiesOnFunctionObj(func){
  func.year = 2015;
  func.divideByTwo = function(a) {
    return a / 2;
  };
  func.prototype.helloWorld = function() {return "Hello World";};

}
