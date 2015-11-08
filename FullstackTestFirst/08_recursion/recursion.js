function factorialIterative(start){
  var total = 1;
  for (var i = start; i > 1; i--){
    total = total*i;
  }
  return total;
}

function factorial(start,total){
  total = total || 1;
  if (start < 1)
    return total;
  total *= start;
  return factorial(start-1,total);
}
/*

function fib(end,sequence){
  sequence = sequence || [0,1];
  sequenceEnd = sequence.length - 1;
  if (sequenceEnd > end)
    return sequence[sequenceEnd];
  sequence.push(sequence[sequenceEnd]+sequence[sequenceEnd - 1]);
  return fib(end,sequence);
}
*/
function fib(num){
  if (num < 2)
    return 1;
  num += 1;//is there a better way to count from 0?
  return fib(num-2) + fib(num-3);
}

function type(testVal){
  return Object.prototype.toString.call(testVal).slice(0,-1).split(" ")[1];
}

function stringify(val){

  if (type(val)==="String")
    return "\"" + val + "\"";
  simpleTypes = ["Number", "Null", "Undefined", "Boolean","Function"];
  if (simpleTypes.indexOf(type(val)) > -1) {
      return String(val);
  }
  if (type(val)==="Array"){
    var result = "";
    for (var i=0;i<val.length;i++){
      result += stringify(val[i]) + ",";
    }
    return "[" + result.slice(0,-1) + "]";
  }
  else {
    var result = "";
    for (var i in val){
      result += "\"" + i + "\"" + ": " + stringify(val[i]) + ",";
    }
    return "{" + result.slice(0,-1) + "}";
  }
}
