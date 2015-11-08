
app.directive('flashcard', function (ScoreFactory) {
    return {
        scope: {card:'='},
        restrict: 'E',
        templateUrl: '/js/directives/flash-card/flash-card.html',
        link: function (scope, element, attrs){
            scope.answerQuestion = function (answer, flashCard) {
          		if (!flashCard.answered) {
          			flashCard.answered = true;
          			flashCard.answeredCorrectly = answer.correct;
          			flashCard.answeredCorrectly ? ScoreFactory.correct++ : ScoreFactory.incorrect++;
          		}
          	}
            // element.on('click','li',function(){
            //   if (!scope.card.answered) {
          	// 		scope.card.answered = true;
          	// 		scope.card.answeredCorrectly = this.correct;
          	// 		scope.card.answeredCorrectly ? ScoreFactory.correct++ : ScoreFactory.incorrect++;
          	// 	}
            // })
        }
    };

});
