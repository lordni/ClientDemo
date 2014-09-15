'use strict';

(function () {
	var api = require('../api/account.js');

	exports.balance = function (req, res) {
		api.balance('42439273')
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
})();
