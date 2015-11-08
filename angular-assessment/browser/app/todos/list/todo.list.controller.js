// define a `TodoListCtrl` controller that places injected
// `todos` (from a UI-Router state resolve) on the scope.
// It should have a scope method `setCategory` that changes
// `$scope.filterByCompleted` to certain values; a method
// `isActiveCategory` that confirms the current category;
// and a method `addTodo` that saves `$scope.toAdd` to the backend,
// then goes to that new todo's edit state.
app.controller('TodoListCtrl', function($scope, todos, Todo, $state){

  $scope.todos = todos;
  activeCategory = '';
  var categoryValues = {
    all: '',
    completed: true,
    active: false,
  };

  $scope.setCategory = function (category) {
    activeCategory = category;
    $scope.filterByCompleted = categoryValues[activeCategory];
  };

  $scope.isActiveCategory = function (category) {
    return category === $scope.activeCategory;
  };

  $scope.addTodo = function (){
      Todo.add($scope.toAdd).then(function (todo) {
        Todo.getAll().then(function(allTodos){
          $scope.todos = allTodos;
          $state.go('todos.edit', {id: todo._id});
        });
      })
    .catch(console.log);
  };

});
