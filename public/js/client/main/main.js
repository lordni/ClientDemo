(function (){

	var app = app || {}

	app.mainModule = {
		create: function (http) {

			var createLoginPromise = function (credentials) {
				return http({
					url: "/login",
					method: "POST",
					data: {
						customerId: credentials.customerId,
						password: credentials.password
					}
				});
			}

			var createLoginStream = function (credentials) {
				return Rx.Observable.fromPromise(createLoginPromise(credentials));
			}

			return {
				createViewModel: function (customerIdStream, passwordStream, loginButtonStream) {
					var viewModel = {
						login: createLoginStream
					};

					return viewModel;
				}
			}
		}
	}

	angular.module('ClientDemo.Main', []).
		factory('mainModule', function ($http) {
			var main = app.mainModule.create($http);

			return main;
		});
})();
