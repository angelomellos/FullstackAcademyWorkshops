// BUILD A MODULE THAT PASSES THE TESTS IN THE MODEL TEST FILE
todo = {};
module.exports = {
  reset: function() {
    todo = {};
  }
}
module.exports.listPeople = function () {
  return Object.keys(todo);
}

module.exports.add = function (name, task) {
  task.complete = false;
  if (!todo.hasOwnProperty(name)){
    todo[name] = [task];
  }
  else {
    todo[name].push(task);
  }
}

module.exports.list = function (name) {
  var tasks = [];
  for (var key in todo){
    if (key === name){
      todo[key].forEach(function(value){
        tasks.push(value);
      }
      )
    }
  }
  //tasks.name = tasks[0].name; circumventing the error in the not up to date test
  return tasks;
}

module.exports.complete = function (name, task) {
  todo[name][task].complete = true;
}

module.exports.remove = function (name, task) {
  delete todo[name][task];
}
