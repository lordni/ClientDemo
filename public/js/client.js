'use strict';

angular.module('ClientDemo', [
	'ngRoute',
	'ClientDemo.Main',
	'ClientDemo.Authenticated',
	'ClientDemo.Product',
	'ClientDemo.Signup',
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
      	templateUrl: 'templates/signup.html',
        controller: 'signupController'
      })
      .when('/produkt/:productName', {
      	templateUrl: 'templates/product.html',
        controller: 'productController'
      })
      .otherwise({
        redirectTo: '/'
      });

	$locationProvider.html5Mode(false);
});
