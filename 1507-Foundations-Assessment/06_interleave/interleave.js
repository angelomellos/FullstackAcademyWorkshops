function interleave () {
  var result = "";
  var maxLength = 0;
  for (var i=0;i<arguments.length;i++){
    if (arguments[i].length>maxLength)
      maxLength = arguments[i].length;
  }
  for (var i=0;i<maxLength;i++){
    for (var j=0;j<arguments.length;j++){
      result += arguments[j].slice(i,i+1);
    }
  }
  return result;
}
