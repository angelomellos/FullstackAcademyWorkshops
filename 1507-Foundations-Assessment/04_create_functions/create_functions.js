function createFunctions(num,arr) {
  var arr  = arr || [];
  if (num < 0)
    return arr.reverse().slice(0,-1);
  arr.push(function(){
      return num;
  })
  return createFunctions(num-1,arr);
}
