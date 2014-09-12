'use strict';

var api = require('../api/account.js');

exports.balance = function (req, res) {
	api.balance('42439273');
	res.send({
		balance: "1234"
	});
}