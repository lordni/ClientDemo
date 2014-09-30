'use strict';

angular.module('ClientDemo', [
	'ngRoute',
	'ClientDemo.Main',
	'ClientDemo.Authenticated',
	'ClientDemo.Product',
	'rx'
])

.config(function ($routeProvider, $locationProvider) {
	$routeProvider
      .when('/', {
        templateUrl: 'templates/main.html',
        controller: 'mainController'
      })
      .when('/min-side', {
        templateUrl: 'templates/authenticated.html',
        controller: 'authenticatedController'
      })
      .when('/tilmeld/:productName', {
      	templateUrl: 'templates/subscribe.html',
        controller: 'subscribeController'
      })
      .when('/produkt/:productName', {
      	templateUrl: 'templates/product.html',
        controller: 'productController'
      })
      .otherwise({
        redirectTo: '/'
      });

	$locationProvider.html5Mode(false);
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

.controller('productController', function ($scope, $routeParams, productModule) {
	$scope.product = productModule.mapProduct($routeParams.productName);
	$scope.productName = $routeParams.productName;
})

.controller('subscribeController', function ($scope, $routeParams, productModule) {

	$scope.foo = 'foobar';
	$scope.product = productModule.mapProduct($routeParams.productName);

});
