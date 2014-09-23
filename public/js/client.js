'use strict';

angular.module('ClientDemo', [
	'ngRoute',
	'ClientDemo.Main',
	'ClientDemo.Authenticated',
	'rx'
])

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

.controller('mainController', function($scope, $http, $location, mainModule, rx) {
	console.log('starting mainController');

	var customerIdStream = $scope.$toObservable('formData.customerId')
		.map(function (data) {
			return (data.newValue === undefined ? {newValue: '', oldValue: data.oldValue} : data);
		})
		.map(function (data) {
			console.log('the user inputted: "' + data.newValue + '"');
			return data.newValue;
		});
	var passwordStream = $scope.$toObservable('formData.password')
		.map(function (data) {
			return (data.newValue === undefined ? {newValue: '', oldValue: data.oldValue} : data);
		})
		.map(function (data) {
			var value = data.newValue;
			if(value !== undefined){
				value = value.replace(/./g, "x");
			}
			console.log('the user inputted: "' + value + '"');
			return data.newValue;
		});

	customerIdStream.subscribe();
	passwordStream.subscribe();
	
	$scope.$createObservableFunction('login')
		.map(function () { 
			return {
				customerId: $scope.formData.customerId,
				password: $scope.formData.password
			}
		})
		.flatMapLatest(mainModule.login)
		.subscribe(function(data) {
			console.log("login complete");
			console.log(data);

			$scope.failingPassword = false;
			$location.path("/min-side");
		}, function (err) {
			console.log("login error");
			console.log(err);

			$scope.failingPassword = true;
		});
})

.controller('authenticatedController', function($scope, $http, authenticatedModule, rx) {
	$scope.balanceText = 'Loading...';

	authenticatedModule.balance()
		.subscribe(function (response) {
			console.log("Success:");
			console.debug(response.data);
			$scope.balanceText = response.data.balance;
		}, function (err) {
			console.log('Error: ' + err);
			$scope.balanceText = 'Kunde ikke hente din balance.';
		});
});
