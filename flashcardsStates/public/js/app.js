var app = angular.module('flashCards', ['ui.router']);

app.value('currentFlashCards', []);

app.config(function ($stateProvider) {
	$stateProvider
	.state('stats', {
		url: '/stats',
		templateUrl: '/js/templates/stats.html',
		controller: 'StatsController'
	})
	.state('createCard', {
		url: '/make-a-card',
		templateUrl: '/js/templates/make-a-card.html',
		controller: 'NewCardController'
	})
	.state('all', {
		url: '/allCards',
		templateUrl: '/js/templates/allCards.html',
		controller: 'MainController'
	})
	.state('manage', {
		url: '/manage/:bob',
		templateUrl: '/js/templates/manage.html',
		controller: function ($scope, theCard) {
			$scope.card = theCard;
		},
		resolve: {
			theCard: function ($stateParams, FlashCardsFactory) {
				return FlashCardsFactory.getCardById($stateParams.bob);
			}
		}
	})
	.state('manage.edit', {
		url: '/edit',
		templateUrl: '/js/templates/manage.edit.html',
		controller: 'EditCardController'
	})
	.state('manage.delete', {
		url: '/delete',
		templateUrl: '/js/templates/manage.delete.html',
		controller: function ($scope, FlashCardsFactory, $state) {
			$scope.removeIt = function () {
				FlashCardsFactory.removeById($scope.card._id)
				.then(function () {
					$state.go('all');
				});
			};
			$scope.cancelRemoval = function () {
				$state.go('^');
			};
		}
	});
});
