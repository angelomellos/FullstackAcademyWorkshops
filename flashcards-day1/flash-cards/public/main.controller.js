app.controller('MainController', function ($scope, FlashCardsFactory) {

	FlashCardsFactory.getFlashCards().then(function (cards) {
		$scope.flashCards = cards;
	});

	// FlashCardsFactory.getCategoryCards().then(function(cards){
	// 	$scope.flashCards = cards;
	// })

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
		}
	}

	$scope.getFlashCards = function(){
		$scope.chosenCategory = undefined;
		FlashCardsFactory.getFlashCards().then(function (cards) {
			$scope.flashCards = cards;
		});
	}

	$scope.getCategoryCards = function (category) {
		$scope.chosenCategory = category;
		FlashCardsFactory.getFlashCards(category).then(function(cards){
			$scope.flashCards = cards;
		});
	}
});
