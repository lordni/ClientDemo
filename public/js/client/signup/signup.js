(function (){

	var app = app || {}

	app.signupModule = {
		create: function (http) {
			return {
				createViewModel: function (
					product,
					simCardSelectionStream,
					npOrNewNumberStream,
					accountTypeStream,
					nameStream,
					emailStream,
					emailConfirmationStream
				) {
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
							'private': /* => */ 'PERSONAL_INFORMATION'
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
					accountTypeStream
						.skip(1)
						.map(function(o) { return o.newValue; })
						.subscribe(function(v) {
							stateMachine[v]();
							viewModel.selections.accountType = v;
						});

					var nameValidStream = nameStream
						.map(function(o) { return o.newValue; })
						.map(function(v) { return v !== undefined && v.length > 0; });

					var firstInputIsValidIsh = Rx.Observable.return(true);

					var viewModel = {
						stateStream: stateStream,
						nameValidStream: firstInputIsValidIsh.concat(nameValidStream.skip(1)),
						selections: {}
					};

					stateMachine.start();

					return viewModel;
				}
			};
		}
	};

	angular.module('ClientDemo.Signup', ['ClientDemo.Product', 'rx']).
		factory('signupModule', function ($http) {
			var module = app.signupModule.create($http);

			return module;
		}).
		controller('signupController', function ($scope, $routeParams, rx, productModule, signupModule, observeOnScope) {
			var product = productModule.mapProduct($routeParams.productName);

			var simCardSelectionStream = observeOnScope($scope, 'simtype');
			var npOrNewNumberStream = observeOnScope($scope, 'npOrNewNumber');
			var accountTypeStream = observeOnScope($scope, 'accountTypeSelection');

			var nameStream = observeOnScope($scope, 'name');
			var emailStream = observeOnScope($scope, 'email');
			var emailConfirmationStream = observeOnScope($scope, 'emailConfirmation');

			var viewModel = signupModule.createViewModel(
				product,
				simCardSelectionStream,
				npOrNewNumberStream,
				accountTypeStream,
				nameStream,
				emailStream,
				emailConfirmationStream
			);

			viewModel.stateStream.subscribe(
				function(state) {
					console.log("new state: '" + state + "'");
					$scope.state = state;
				}
			);

			viewModel.nameValidStream.subscribe(function(isValid) {
				console.log("name is valid? " + isValid);
				$scope.nameInvalid = !isValid;
			});
		});
})();
