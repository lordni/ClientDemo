'use strict';

(function() {
	angular.module('ClientDemo.Main', []).
		factory('mainModule', function ($http) {
			var main = app.mainModule.create($http);

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
