app.controller('NewMessageController', function ($scope, MessagesFactory) {
  $scope.messages = [];
  $scope.submitMessage = function(){
    MessagesFactory.sendMessage($scope.currentMessage).then(function(message){
      console.log('======',message);
      $scope.messages.push(message);
    })
  };
  $scope.currentMessage = {};
});
