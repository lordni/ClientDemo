(function (){

	var app = app || {}

	app.signupModule = {
		create: function (http) {
			return {
				createViewModel: function () {
					var viewModel = {

					};

					return viewModel;
				}
			}
		}
	}

	angular.module('ClientDemo.Signup', ['ClientDemo.Product']).
		factory('signupModule', function ($http) {
			var module = app.signupModule.create($http);

			return module;
		}).
		controller('signupController', function ($scope, $routeParams, productModule) {
			$scope.foo = 'foobar';
			$scope.product = productModule.mapProduct($routeParams.productName);
		});
})();
