app.factory('FlashCardsFactory', function() {
  var getCategoryCards = function(category) {
    var loading = true;
    FlashCardsFactory.getFlashCards(category).then(function(cards) {
      ScoreFactory.reset();
      var selectedCategory = category;
      var flashCards = cards;
    }).catch(function(err) {
      $log.error('error getting cards:', err);
    }).finally(function() {
      loading = false;
    });
  };
}
