'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/browser/app/login/login.html',
		controller: 'loginController'
	});
});

app.controller('loginController', function ($scope, authFactory, $state) {
	$scope.login = authFactory.login;
  $scope.logout = authFactory.logout;
});
