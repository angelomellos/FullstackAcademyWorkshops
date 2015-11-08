app.controller('MainController', function ($scope, FlashCardsFactory, ScoreFactory) {
	$scope.isLoading = true;
	FlashCardsFactory.getFlashCards().then(function (cards) {
		$scope.isLoading = false;
		$scope.flashCards = cards;
	});



	$scope.categories = [
		'MongoDB',
		'Express',
		'Angular',
		'Node'
	];
	$scope.answerQuestion = function (answer, flashCard) {
		if (!flashCard.answered) {
			flashCard.answered = true;
			flashCard.answeredCorrectly = answer.correct;
			flashCard.answeredCorrectly ? ScoreFactory.correct++ : ScoreFactory.incorrect++;
		}
	}

	$scope.getFlashCards = function(){
		$scope.chosenCategory = undefined;
		FlashCardsFactory.getFlashCards().then(function (cards) {
			$scope.isLoading = false;
			$scope.flashCards = cards;
		});
	}

	$scope.getCategoryCards = function (category) {
		$scope.chosenCategory = category;
		FlashCardsFactory.getFlashCards(category).then(function(cards){
			$scope.isLoading = false;
			$scope.flashCards = cards;
		});
	}
});
