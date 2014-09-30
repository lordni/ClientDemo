(function (){

	var app = app || {}

	app.authenticatedModule = {
		create: function (http) {
			var createBalanceStream = function () {
				return Rx.Observable
					.fromPromise(http({
						url: '/balance',
						method: 'GET'
					}));
			}
			return {
				balance: createBalanceStream
			}
		}
	}

	angular.module('ClientDemo.Authenticated', []).
		factory('authenticatedModule', function ($http) {
			var main = app.authenticatedModule.create($http);

			return main;
		}).
		controller('authenticatedController', function($scope, $http, authenticatedModule, rx) {
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
})();
