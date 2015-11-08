app.directive('message', function ($state) {
  return {
		restrict: 'E',
    scope: {
      emailMessage: '='
    },
		templateUrl: 'browser/directives/message.html',
    link: function (scope) {
      scope.goToMessageState = function () {
        $state.go('messageView', {id: scope.emailMessage._id})
      }
    }
	};
});
