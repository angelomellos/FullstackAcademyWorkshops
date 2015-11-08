// 06_Functional
function doubler(num){
  return num * 2;
}
function map(arr, func){
  newArr = [];
  for (var i=0;i<arr.length;i++){
    newArr.push(func(arr[i]));
  }
  return newArr;
}
function filter(arr, func){
  newArr = [];
  for (var i=0;i<arr.length;i++){
    if (func(arr[i]))
      newArr.push(arr[i]);
  }
  return newArr;
}
function contains(obj, contained){
  for (var i in obj){
    if (obj[i]===contained)
      return true;
    }
  return false;
}
function countWords(str){
  arr = str.split(" ");
  return arr.length;
}
function reduce(arr,start,func){
  var result=0;
  for (var i=start;i<arr.length;i++){
    result = func(arr[i],result);
  }
  return result;
}
function countWordsInReduce(a,b){
  return countWords(a) + b;
}
function sum(arr){
  return reduce(arr,0,function(a,b){
    return a+b;
  });
}
function every(arr, func){
  for (var i=0;i<arr.length;i++){
    if (!func(arr[i]))
      return false;
  }
  return true;
}
function any (arr,func) {
  if (arr.length === 0)
    return false;
  if (func(arr.shift()))
    return true;
  return any(arr,func);
}
