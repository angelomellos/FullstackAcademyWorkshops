var fs = require('fs');
//var req = fs.readFileSync("program.js","utf-8", function (err,data) {
  //console.log(data.split("/n").length+1);
//});
var buf = fs.readFile(process.argv[2],"utf-8",function (error, data) {
  console.log(data.split("\n").length-1);
});
