function vowelsCount (str) {
  var count = 0;
  var vowels = [97,101,105,111,117,65,69,73,79,85];
  for (var i=0;i<str.length;i++){
    if (vowels.indexOf(str.charCodeAt(i))>-1){
      count++;
    }
  }
  return count;
}
