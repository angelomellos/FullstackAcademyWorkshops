var inquirer = require('inquirer')

var game = require('./game.source')

var currentNode = game.startingPoint

var play = function(node) {

  var choices = node.getConnectionStrings()

  // we've reached a terminal node
  if(!choices.length) return console.log(node.text)

  inquirer.prompt([{
    type: 'list',
    name: node.title,
    message: node.text,
    choices: choices
  }], function(answers) {
    var answer = answers[node.title]
    var nextNode = node.route(answer)
    console.log("logged: "+answers);
    play(nextNode)
  })
}

play(currentNode)
