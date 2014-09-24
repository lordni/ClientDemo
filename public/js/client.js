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

	var extractNewValue = function (data) {
		return (data.newValue === undefined ? '' : data.newValue);
	}

	var customerIdStream = $scope.$toObservable('formData.customerId').map(extractNewValue);
	var passwordStream = $scope.$toObservable('formData.password').map(extractNewValue);
	var loginButtonStream = $scope.$createObservableFunction('login');

	var viewModel = mainModule.createViewModel(customerIdStream, passwordStream, loginButtonStream);

	loginButtonStream.subscribe(function () {
		viewModel.login({
			customerId: $scope.formData.customerId,
			password: $scope.formData.password
		})
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
