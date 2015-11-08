'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    green = exerciseUtils.green,
    red = exerciseUtils.red;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// runs every problem given as command-line argument to process
args.forEach(function(arg){
  module.exports['problem' + arg]();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. log poem two stanza one and stanza two, in any order
   *    but log 'done' when both are done
   *    (ignore errors)
   *    note: reads are occurring in parallel (simultaneously)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       green(stanza);
  //       eachDone();
  //       console.log('done')
  //     });
  //   },
  //   function (err) {
  //     //console.log('err');
  //   }
  // );

  // promise version
  promisifiedReadFile('poem-two/stanza-01.txt')
  .then(function (stanza) {green(stanza);
  return promisifiedReadFile('poem-two/stanza-02.txt')})
  .then(function (stanza) {
    green(stanza);
    console.log('done');
  }, red)

}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. log all the stanzas in poem two, in any order
   *    and log 'done' when they're all done
   *    (ignore errors)
   *    note: reads are occurring in parallel (simultaneously)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
  // async.each(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       //console.log('-- B. callback version --');
  //       green(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('done');
  //   }
  // );

  // promise version

  Promise.map(filenames, function (file) {
    return promisifiedReadFile(file).then(green)
  }).finally(function (){
      console.log('done')
  })

}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. read & log all the stanzas in poem two, *in order*
   *    and log 'done' when they're all done
   *    (ignore errors)
   *    note: reads are occurring in series (only when previous finishes)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  //
  // // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       green(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('done');
  //   }
  // );

  // Promise.map(filenames, function (file) {
  //   return promisifiedReadFile(file)
  // }).then(function (res){
  //     res.forEach(green)
  //     return 'done'
  // }).then(console.log)
  Promise.reduce(filenames,function (total,item) {
    return promisifiedReadFile(item).then(green)
  }, null).then(function (){console.log('done')})



}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. log all the stanzas in poem two, *in order*
   *    making sure to fail for any error and log it out
   *    and log 'done' when they're all done
   *    note: reads are occurring in series (only when previous finishes)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + randIdx + '.txt';

  // // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       green(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) red(err);
  //     console.log('-- D. callback version done --');
  //   }
  // );
  // promise version
  //  Promise.map(filenames, function (file) {
  //   return promisifiedReadFile(file)
  // })
  // .then(function (res){
  //     res.forEach(green)
  //     return 'done'
  // })
  // .then(console.log)
  // .catch(red)

  Promise.reduce(filenames,function (total,item) {
    return promisifiedReadFile(item).then(green)
  }, null)
  .then(function (){console.log('done')}).finally(null,red)

}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. make a promisifed version of fs.writeFile
   *
   */

  var fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // your code here
  }
}
