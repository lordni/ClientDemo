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
		});
})();
