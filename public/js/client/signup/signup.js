'use strict';

var app = app || {};

(function (){
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
})();
