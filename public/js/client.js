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
      .when('/tilmeld/:productName', {
      	templateUrl: 'templates/tilmeld.html',
        controller: 'subscribeController'
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

	var viewModel = mainModule.createViewModel(customerIdStream, passwordStream);

	loginButtonStream.subscribe(function () {
		viewModel.login()
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
})

.controller('subscribeController', function ($scope, $routeParams) {

	var mapProduct = function (productName) {
		var productMap = {
			'produkt-1': '2f40e0f6-80ad-4110-9cb9-67f814fe6576',
			'produkt-2': '7797efff-99bf-4a88-a503-0b30f421a07d',
			'produkt-3': '9b9032ac-0aae-4739-b6bb-49b1847bdcc1',
		}
		
		return productMap[productName];
	};

	$scope.foo = 'foobar';
	$scope.product = mapProduct($routeParams.productName);

});
