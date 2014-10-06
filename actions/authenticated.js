'use strict';

(function () {
	var api = require('../api/account.js');

	exports.balance = function (req, res) {

		if (!req.isAuthenticated()) {
			console.log("un-authenticated user");
			res.statusCode = 401;
			res.send("Unauthenticated user. Please sign in");
		} else {
			var dummyPhoneNumber = '42439273';
			api.balance(dummyPhoneNumber)
				.then(function (data) {
					console.log('data: ');
					console.log(data);
					res.send({
						balance: data.balance
					});
				}, function(err) {
					console.log('error:');
					console.log(err);

					res.statusCode = 500;
					res.send(err);
				});
		}
	}
})();
