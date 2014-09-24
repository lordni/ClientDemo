(function (){

	var app = app || {}

	app.subscribeModule = {
		create: function (http) {
			return {
				
			}
		}
	}

	angular.module('ClientDemo.Subscribe', []).
		factory('subscribeModule', function ($http) {
			var module = app.subscribeModule.create($http);

			return module;
		});
})();
