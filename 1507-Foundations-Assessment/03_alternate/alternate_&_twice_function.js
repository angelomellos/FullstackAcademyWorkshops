function alternate (func) {
  var on = true;
  return function() {
    if (on){
      on = !on;
      func();
    }
    else{
      on = !on;
    }
  };
}
function twice (func) {
  var timesCalled = 0;
  return function(){
    if (timesCalled>1){
      return null;
    }
    timesCalled++;
    return func();
  };
}
