(function (){

	var app = app || {}

	app.subscribeModule = {
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

	angular.module('ClientDemo.Subscribe', ['ClientDemo.Product']).
		factory('subscribeModule', function ($http) {
			var module = app.subscribeModule.create($http);

			return module;
		}).
		controller('subscribeController', function ($scope, $routeParams, productModule) {
			$scope.foo = 'foobar';
			$scope.product = productModule.mapProduct($routeParams.productName);
		});
})();
