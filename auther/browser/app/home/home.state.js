'use strict';

app.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/browser/app/home/home.html'
	});
// in the main app.config(function () {...})
$urlRouterProvider.when('/auth/:provider', function () {
    window.location.reload();
});
});
