var nytimesmean = angular.module('nytimesmean', ['ngRoute', 'ngAnimate', 'ngSanitize']);


var controllers = {};
nytimesmean.controller(controllers);



nytimesmean.config(function ($routeProvider){
	$routeProvider
	.when ('/search', {
		//controller: 'simpleController',
		templateUrl: 'intro.html'
	})
	.when ('/search', {
		controller: 'searchCtrl',
		templateUrl: 'search.html'
	})
	.when ('/saved', {
		controller: 'searchCtrl',
		templateUrl: 'saved.html'
	})
	.otherwise({
		redirectTo: '/search'
	});
});
