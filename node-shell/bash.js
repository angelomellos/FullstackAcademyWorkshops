var command = require('./command');
var fs = require('fs');
// Output a prompt
process.stdout.write('prompt > ');

// The stdin 'data' event fires after a user types in a line
process.stdin.on('data', function(data) {
  var file = data.toString().trim().split(" "); // remove the newline

  command[file[0]](file);


});
