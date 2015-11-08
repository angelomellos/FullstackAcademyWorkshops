// Functions.js
function concat_string(){
  var args = Array.prototype.slice.call(arguments, 0);
  return args.join("");
}
function yourFunctionRunner(funcs){
  var args = Array.prototype.slice.call(arguments, 0);
  for (var arg in args){
    args[arg] = args[arg]();
  }
  return args.join("");
}
function makeAdder(augend){
  var augend = augend;
  return function(addend) {
    return augend + addend;
  };
}
var once = function(func) {
  functionToBeRunByIncrement = function(){
    functionToBeChanged();
  };
  functionToBeChanged = function(){
    console.log("First, I do func");
    func();
    functionToBeChanged=function(){
      console.log("Then I don't");
    };
  }
  return functionToBeRunByIncrement;
}
function createObjectWithTwoClosures(){
  var augend = 0;
  return {
    oneIncrementer: function (){augend++;},
    tensIncrementer: function(){augend+=10;},
    getValue: function(){return augend;},
  };
}
