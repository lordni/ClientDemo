(function (){

	var app = app || {}

	app.mainModule = {
		create: function (http) {
			var createLoginStream = function (credentials) {
				return Rx.Observable
					.fromPromise(http({
						url: "/login",
						method: "POST",
						data: {
							customerId: credentials.customerId,
							password: credentials.password
						}
					}));
			}

			return {
				login: createLoginStream
			}
		}
	}

	angular.module('ClientDemo.Main', []).
		factory('mainModule', function ($http) {
			var main = app.mainModule.create($http);

			return main;
		});
})();
