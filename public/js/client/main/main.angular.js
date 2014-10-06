'use strict';

(function() {
	angular.module('ClientDemo.Main', ['ClientDemo.Authenticated']).
		factory('mainModule', function ($http, authenticatedModule) {
			var main = app.mainModule.create($http, authenticatedModule);

			return main;
		}).
		controller('mainController', function($scope, $http, $location, mainModule, rx) {
			var extractNewValue = function (data) {
				return (data.newValue === undefined ? '' : data.newValue);
			}

			var customerIdStream = $scope.$toObservable('formData.customerId').map(extractNewValue);
			var passwordStream = $scope.$toObservable('formData.password').map(extractNewValue);
			var loginButtonStream = $scope.$createObservableFunction('login');

			var viewModel = mainModule.createViewModel(customerIdStream, passwordStream);

			$scope.userIsLoggedIn = undefined;

			viewModel.balanceStream
				.subscribe(function(response) {
					console.log("user is logged in");
					$scope.userIsLoggedIn = true;
					$scope.balance = response.data.balance;
				}, function(err) {
					console.log("user is NOT logged in");
					$scope.userIsLoggedIn = false;
				});

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
		});
})();
