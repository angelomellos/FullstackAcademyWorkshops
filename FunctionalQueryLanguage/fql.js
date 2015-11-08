function merge (obj1, obj2) {
  for (var key in obj1){
    obj2[key] = obj1[key];
  }
  return obj2;
}

function FQL (movies) {
  this.movies = movies;
}

FQL.prototype.exec = function () {
  return this.movies;
}

FQL.prototype.count = function () {
  return this.movies.length;
}

FQL.prototype.limit = function (num) {
  return new FQL(this.movies.slice(0,num));
}

FQL.prototype.where = function (obj) {
  var arr = [];
  var numberOfCrit = Object.keys(obj).length;
  
  for (var i=0;i<this.movies.length;i++){
    var numberOfMatches = 0;
    for (var key in this.movies[i]){
      if (typeof obj[key] === 'function'){
        if (obj[key](this.movies[i][key])){
        numberOfMatches++;
          console.log("Ran function" + i );
        }
      }

      if (this.movies[i][key] === obj[key]){
        numberOfMatches++;
        console.log("Ran simple" + i );
      }
      if (numberOfMatches === numberOfCrit){

      arr.push(this.movies[i]);
      }
    }
  }
  return new FQL(arr);
}
