// define a `TodoEditCtrl` controller that places an injected
// `todo` (from a UI-Router state resolve) on the scope.
// It should have a scope method `keepChanges` that updates
// the current todo in the backend and then goes to the
// current todo's detail state.
app.controller('TodoEditCtrl', function ($scope, todo, Todo, $state) {
  $scope.todo = todo;
  $scope.keepChanges = function () {
    Todo.update($scope.todo._id, $scope.todo).then(function(todo){
      $state.go('todos.detail', {id: todo._id});
    });
  };
});
