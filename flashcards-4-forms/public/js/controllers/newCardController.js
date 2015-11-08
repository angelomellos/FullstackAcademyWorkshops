app.controller('NewCardController', function($scope, $rootScope, FlashCardsFactory,  $http) {
  $scope.categories = FlashCardsFactory.categories;


  //console.dir($scope);
  $scope.postCard = {
    submit: function(form) {
      if (form.$valid) {
        $http.post('/cards/', $scope.newCard).then(function(response) {
          resetCard();
          console.log(response.data);
          $rootScope.$broadcast('newCard');
        });
      } else {
        alert('ERROR');
      }
    }
  };
function resetCard() {
  $scope.newCard = {
    question: null,
    category: null,
    answers: [{
      text: null,
      correct: false
    }, {
      text: null,
      correct: false
    }, {
      text: null,
      correct: false
    }]
  };
}
resetCard();
});
