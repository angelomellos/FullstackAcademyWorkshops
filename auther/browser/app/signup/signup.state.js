'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/browser/app/signup/signup.html',
		controller: 'signupController',
	});
});

app.controller('signupController', function ($scope, authFactory, $state) {
  $scope.signup = authFactory.signup;
});
