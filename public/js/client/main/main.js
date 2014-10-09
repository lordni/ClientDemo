var app = app || {};

(function (){
	app.mainModule = {
		create: function (http, authenticatedModule) {

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

			var balanceStream = authenticatedModule.balance();

			return {
				createViewModel: function (customerIdStream, passwordStream) {
					var viewModel = {
						login: function () {
							return createLoginStream(viewModel.credentials);
						},
						credentials: {},
						balanceStream: balanceStream
					};

					customerIdStream.subscribe(function (customerId) {
						viewModel.credentials.customerId = customerId;
					});
					passwordStream.subscribe(function (password) {
						viewModel.credentials.password = password;
					});

					return viewModel;
				}
			}
		}
	}
})();
