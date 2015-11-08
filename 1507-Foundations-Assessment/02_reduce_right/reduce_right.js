function reduceRight (arr,start,func) {
  result = start;
  for (var i=arr.length-1;i>=0;i--){
    result = func(result, arr[i]);
  }
  return result;
}

//Expected 'undefinedhell' to...

function reduceRightRecursive (arr,start,func) {
  result = func(start,arr.pop());
  if (arr.length===0){
    return result;
  }
  return reduceRightRecursive(arr,result,func);
}
