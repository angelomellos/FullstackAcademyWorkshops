app.controller('MainController', function($scope, FlashCardsFactory, $rootScope,  $log,
  ScoreFactory) {

  $scope.categories = FlashCardsFactory.categories;
  $scope.selectedCategory;



  $scope.getCategoryCards = function(category) {
    $scope.loading = true;
    FlashCardsFactory.getFlashCards(category).then(function(cards) {
      ScoreFactory.reset();
      $scope.selectedCategory = category;
      $scope.flashCards = cards;
    }).catch(function(err) {
      $log.error('error getting cards:', err);
    }).finally(function() {
      $scope.loading = false;
    });
  };

  $scope.$on('newCard',function(){
    console.log('running root scope on');
    $scope.getCategoryCards($scope.selectedCategory);
  });


  $scope.getCategoryCards();
});
