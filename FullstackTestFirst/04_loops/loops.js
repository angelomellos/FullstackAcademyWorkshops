function repeat(word,times){
  var result = "";
  for (var i=0;i<times;i++){
    result += word;
  }
  return result;
}
function sum(arr){
  var result = 0;
  for (var i=0;i<arr.length;i++){
    result += arr[i];
  }
  return result;
}
function gridGenerator(size){
  var result = "";
  var poundOrSpace = true;
  for (var i=0;i<size;i++){
    result += "\n";
    for (var j=0;j<size;j++){
      poundOrSpace = !poundOrSpace;
      if (poundOrSpace){
        result += " ";
      }
      else
        result += "#";
    }
  }
  return result;
}
function largestTripletRecursion(c){
  for (var b=c-1;b>0;b--){
    for (var a=b-1;a>0;a--){
      if (a*a+b*b==c*c){
        return [a,b,c];
      }
    }
  }
  return largestTriplet(c-1);
}
function largestTriplet(c){
  for (;c > 0;c--){
    for (var b=c-1;b>1;b--){
      for (var a=b-1;a>0;a--){
        if (a*a+b*b==c*c){
          return [a,b,c];
        }
      }
    }
  }
  return "Started too low."
}
function join(arr, delimiter){
  var result = "";
  var del = delimiter || "";
  for (var i=0;i<arr.length;i++){
    result += arr[i] + del;
  }
  if (result.substring(result.length-1) == delimiter)
    return result.substring(0, result.length - 1);
  return result;
}

function paramify(obj){
  var objArr = [];
  for (var i in obj){
    if (obj.hasOwnProperty(i))
      objArr.push(i+"="+obj[i]);
  }
  result = join(objArr.sort(),"&");
  return result;
}
