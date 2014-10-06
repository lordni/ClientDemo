'use strict';

(function() {
	angular.module('ClientDemo.Product', []).
		factory('productModule', function ($http) {
			return app.productModule.create($http);
		}).
		controller('productController', function ($scope, $routeParams, productModule) {
			$scope.product = productModule.mapProduct($routeParams.productName);
			$scope.productName = $routeParams.productName;
		});
})();
