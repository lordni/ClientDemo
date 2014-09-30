(function (){

	var app = app || {}

	app.signupModule = {
		create: function (http) {
			return {
				createViewModel: function (product, simCardSelectionStream, npOrNewNumberStream) {
					var state = 'SIM_CARD_SELECTION';

					var stateStream = new Rx.ReplaySubject();

					var stateMachine = Stately.machine({
						'START': {
							'start': /* => */ 'SIM_CARD_SELECTION',
						},
						'SIM_CARD_SELECTION': {
							'combi': /* => */ 'NP_OR_NEW_NUMBER',
							'nano': /* => */ 'NP_OR_NEW_NUMBER'
						},
						'NP_OR_NEW_NUMBER': {
							'np': /* => */ 'NOT_SUPPORTED',
							'newNumber': /* => */ 'ACCOUNT_TYPE_SELECTION'
						},
						'ACCOUNT_TYPE_SELECTION': {
							'company': /* => */ 'NOT_SUPPORTED',
							'person': /* => */ 'PERSONAL_INFORMATION'
						},
						'PERSONAL_INFORMATION': {
							'done': /* => */ 'DONE'
						},
						'NOT_SUPPORTED': {},
						'DONE': {}
					}, 'START').bind(function (event, oldState, newState) {
						console.log("Event: " + event + ", state change: " + oldState + "=>" + newState);
						stateStream.onNext(newState);
					});

					simCardSelectionStream
						.skip(1)
						.map(function(o) { return o.newValue; })
						.subscribe(function(v) {
							stateMachine[v]();
							viewModel.selections.simtype = v;
						});
					npOrNewNumberStream
						.skip(1)
						.map(function(o) { return o.newValue; })
						.subscribe(function(v) {
							stateMachine[v]();
							viewModel.selections.npOrNewNumber = v;
							var dummyNumber = '50403020';
							viewModel.selections.number = dummyNumber;
						});

					var viewModel = {
						stateStream: stateStream,
						selections: {}
					};

					stateMachine.start();

					return viewModel;
				}
			};
		}
	};

	angular.module('ClientDemo.Signup', ['ClientDemo.Product']).
		factory('signupModule', function ($http) {
			var module = app.signupModule.create($http);

			return module;
		}).
		controller('signupController', function ($scope, $routeParams, productModule, signupModule, observeOnScope) {
			var product = productModule.mapProduct($routeParams.productName);

			var simCardSelectionStream = observeOnScope($scope, 'simtype');
			var npOrNewNumberStream = observeOnScope($scope, 'npOrNewNumber');

			var viewModel = signupModule.createViewModel(product, simCardSelectionStream, npOrNewNumberStream);

			viewModel.stateStream.subscribe(
				function(state) {
					console.log("new state: '" + state + "'");
					$scope.state = state;
				}
			);
		});
})();
