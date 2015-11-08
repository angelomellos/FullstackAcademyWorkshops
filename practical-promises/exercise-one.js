'use strict';

var Promise = require('bluebird'),
    exerciseUtils = require('./utils');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    green = exerciseUtils.green,
    red = exerciseUtils.red,
    blue = exerciseUtils.blue;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF
};

// runs every problem given as command-line argument to process
args.forEach(function(arg){
  module.exports['problem' + arg]();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. log poem one stanza one (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-01.txt', function (err, stanza) {
  //   console.log(stanza);
  //   green(stanza);
  // });


  // promise version
  // ???

  promisifiedReadFile('poem-one/stanza-01.txt')
  .then(function(chunk) {red('I am first'); return chunk})
  .then(function(chunk) {console.log(chunk)})
  .then(function() {green('i am last')});
}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. log poem one stanza two and three, in any order
   *    (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   setTimeout(function() {
  //     console.log(stanza2);
  //     green(stanza2);
  //   }, 0)

  // });
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log(stanza3);
  //   green(stanza3);
  // });

  // promise version
  // ???

  promisifiedReadFile('poem-one/stanza-02.txt')
    .then(function cheese(chunk) {
      red(chunk);
      return chunk;
    })
    .then(function(chunk) {
      green('end of stanza 2');
      // console.log(chunk);
      return chunk;
    })
  .then(function(chunk1) {
    promisifiedReadFile('poem-one/stanza-03.txt')
    .then(function(chunk2) {
      red(chunk1) + '\n' + blue(chunk2)
    })
    .then(function() {
      green('end of stanza 3');
    })
  });



}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. read & log poem one stanza two and *then* read & log stanza three
   *    log 'done' when both are done
   *    (ignore errors)
   *
   */

  // callback version
  // readFile('poem-one/stanza-02.txt', function (err, stanza2) {
  //   console.log(stanza2);
  //   green(stanza2);
  //   readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //     console.log(stanza3);
  //     green(stanza3);
  //     console.log('done');
  //   });
  // });

  // promise version (hint: don't need to nest `then` calls)
  // ???


  promisifiedReadFile('poem-one/stanza-02.txt')
    .then(function(stanza2) {
      green(stanza2);
      return promisifiedReadFile('poem-one/stanza-03.txt');
    })
    .then(function(stanza3) {
      blue(stanza3);
      console.log('done');
    })
}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. log poem one stanza four or an error if it occurs
   *
   */

  // callback version
  // readFile('poem-one/wrong-file-name.txt', function (err, stanza4) {
  //   // console.log(stanza4);
  //   if (err) red(err);
  //   else green(stanza4);
  // });

  // promise version
  // ???
  promisifiedReadFile('poem-one/wrong-file-name.txt')
  .then(green, red)
}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. read & log poem one stanza three and *then* read & log stanza four
   *    or log an error if it occurs for either file read
   *
   */

  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log(stanza3);
  //   if (err) return red(err);
  //   green(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log(stanza4);
  //     if (err2) return red(err2);
  //     green(stanza4);
  //   });
  // });

  // promise version
  // ???

  promisifiedReadFile('poem-one/stanza234-03.txt')
  // .then(green, red)
  // .then(promisifiedReadFile('poem-one/stanza-04.txt'))
  // .then(green, red);
  .then(function(stanza) {
    green(stanza);
    return promisifiedReadFile('poem-one/stanza-04.txt');
  }, red)
  .then(function(stanza) {
    green(stanza)
  }, red)
}

function problemF () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * F. read & log poem one stanza three and *then* read & log stanza four
   *    or log an error if it occurs for either file read
   *    always log 'done' when everything is done
   *
   */

  // callback version
  // readFile('poem-one/stanza-03.txt', function (err, stanza3) {
  //   console.log(stanza3);
  //   if (err) {
  //     red(err);
  //     console.log('done');
  //     return;
  //   }
  //   green(stanza3);
  //   readFile('poem-one/wrong-file-name.txt', function (err2, stanza4) {
  //     console.log(stanza4);
  //     if (err2) red(err2);
  //     else green(stanza4);
  //     console.log('done');
  //   });
  // });

  // promise version
  // ???

  promisifiedReadFile('poem-one/stanz765a-03.txt')
  .then(function(chunk) {
    green(chunk);
    return promisifiedReadFile('poem-one/stanza-04.txt')
  })
  .then(function(chunk) {
    green(chunk);
  }, red)
  .then(function() {
    console.log('done');
  })
}
