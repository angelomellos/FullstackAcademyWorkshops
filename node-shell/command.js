var fs = require('fs');
var request = require('request');
module.exports = {};
module.exports.pwd = function (file) {
    process.stdout.write(__dirname);
    process.stdout.write('\nprompt > ');
    return true;
}

module.exports.date = function (file) {
    date = new Date().toString();
    process.stdout.write(date);
    process.stdout.write('\nprompt > ');
    return true;
}

module.exports.echo = function (file) {
    for (var i=1;i<file.length;i++){
    process.stdout.write(file[i]+" ");
    }
    process.stdout.write('\nprompt > ');
    return true;
}

module.exports.curl = function (file) {
    request(file[1], function (error, response, body) {
  if (!error && response.statusCode == 200) {
    process.stdout.write(response);
    process.stdout.write("prompt >");
  }
})
  return true;
}

module.exports.cat = function (file) {
  fs.readFile(file[1],{encoding: 'utf-8'},function (err, data) {
  if (err) throw err;
  process.stdout.write(data);
  process.stdout.write("prompt >");
});
  return true;
}

module.exports.head = function (file) {
  fs.readFile(file[1],{encoding: 'utf-8'},function (err, data) {
  if (err) throw err;
  var head = "";
  var headArray = data.split('\n');
  for (var i = 0; i < 6; i++) {
    head += headArray[i]+"\n";
  }
  process.stdout.write(head);
  process.stdout.write("prompt >");
});
  return true;
}

module.exports.tail = function (file) {
  fs.readFile(file[1],{encoding: 'utf-8'},function (err, data) {
  if (err) throw err;
  var tail = [];
  var tailArray = data.split('\n');
  for (var i = tailArray.length-1; i > tailArray.length-6; i--) {
    tail.unshift(tailArray[i]);
  }
  process.stdout.write(tail.join("\n"));
  process.stdout.write("prompt >");
});
  return true;
}


module.exports.ls = function (file) {
  fs.readdir('.', function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    process.stdout.write(file.toString() + "\n");
  })
  process.stdout.write("prompt >");
});
  return true;
}

module.exports.find = function (file) {
  if (file.sub){
    var path = "."+file.sub;
  }
  else{
    path = ".";
  }
  fs.readdir(path, function(err, files) {
  if (err) throw err;
  files.forEach(function(file) {
    process.stdout.write(file.toString() + "\n");
    if (file.indexOf(".")>-1){
      file.sub = "./"+file;
    module.exports.find(file);
    }
  })
  process.stdout.write("prompt >");
});
  return true;
}
