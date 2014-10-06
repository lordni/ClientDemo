'use strict';

(function() {
	angular.module('ClientDemo.Signup', ['ClientDemo.Product', 'rx']).
		factory('signupModule', function ($http) {
			var module = app.signupModule.create($http);

			return module;
		}).
		controller('signupController', function ($scope, $routeParams, rx, productModule, signupModule, observeOnScope) {
			var product = productModule.mapProduct($routeParams.productName);

			var simCardSelectionStream = observeOnScope($scope, 'simtype');
			var npOrNewNumberStream = observeOnScope($scope, 'npOrNewNumber');
			var accountTypeStream = observeOnScope($scope, 'accountTypeSelection');

			var nameStream = observeOnScope($scope, 'name');
			var emailStream = observeOnScope($scope, 'email');
			var emailConfirmationStream = observeOnScope($scope, 'emailConfirmation');

			var viewModel = signupModule.createViewModel(
				product,
				simCardSelectionStream,
				npOrNewNumberStream,
				accountTypeStream,
				nameStream,
				emailStream,
				emailConfirmationStream
			);

			viewModel.stateStream.subscribe(
				function(state) {
					console.log("new state: '" + state + "'");
					$scope.state = state;
				}
			);

			viewModel.nameValidStream.subscribe(function(isValid) {
				console.log("name is valid? " + isValid);
				$scope.nameInvalid = !isValid;
			});
		});
})();