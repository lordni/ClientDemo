'use strict';

angular.module('ClientDemo', ['ngRoute'])

.config(function ($routeProvider, $locationProvider) {
	$routeProvider
      .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'mainController'
      })
      .when('/min-side', {
        templateUrl: 'templates/min-side.html',
        controller: 'authenticatedController'
      })
      .otherwise({
        redirectTo: '/'
      });

	$locationProvider.html5Mode(false);
})

.controller('mainController', function($scope, $http, $location) {
	console.log('starting mainController');
	$scope.login = function(){
		$http.post('/login', $scope.formData)
			.success(function(data) {
				$scope.failingPassword = false;
				$location.path( "/min-side" );
				console.log(data);
			})
			.error(function(data) {
				$scope.failingPassword = true;
				console.log('Error: ' + data);
			});
	};
})

.controller('authenticatedController', function($scope) {
	console.log('starting authenticatedController');
});
