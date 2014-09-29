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

	angular.module('ClientDemo.Subscribe', []).
		factory('subscribeModule', function ($http) {
			var module = app.subscribeModule.create($http);

			return module;
		});
})();
