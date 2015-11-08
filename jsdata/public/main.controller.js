'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('main', {
		url: '/',
		templateUrl: '/main.html',
		controller: 'MainController'
			// RESOLVE!
	})
})

app.controller('MainController', function($scope, Post) {
	Post.findAll()
	.then(function(allPosts){
		$scope.allPosts = allPosts;
	})
});
