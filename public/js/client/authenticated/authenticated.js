var app = app || {};

(function (){

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
})();
