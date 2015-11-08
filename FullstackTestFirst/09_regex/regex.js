function findACount(word){
  var arr = word.match(/a/gi);
  if(arr===null)//really have to do this?
    return 0;
  return arr.length;
}

function areaCodeFinder(num) {
  var area = num.match(/\d\d\d/);
  if(area===null)
    return "not valid";
  return parseInt(area);
}

function adjustUrlParameter(url, param){
  param = "?" + param;
  var type = /\?.*=/;
  var full = /\?.*=.*(?!\&)/;
  if (type.exec(url)===null||type.exec(url)===null){
    url += param;
    return url;
  }
  if (type.exec(url)[0]===type.exec(param)[0]){
    url = url.replace(full,"");
    url += param;
    return url;
  }
  else{
    url += param.replace("?","&");
    return url;
  }
}

function stringPlusPlus(str){
  var patt = /\d+$/;
  if (patt.test(str)){
    var numArr = patt.exec(str)[0].split("");
    return str.slice(0,-numArr.length) + addOne(numArr,numArr.length-1);
    }
  else {
    return str + "1";
  }
}

function addOne(arr,ind){
  if (arr[ind]==9){
    arr[ind] = 0;
    return addOne(arr,ind-1);
  }
  else{
    arr[ind] = parseInt(arr[ind])+1;
    return String(arr).replace(/,/g,"");
  }
}
