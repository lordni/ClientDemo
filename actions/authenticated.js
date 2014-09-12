'use strict';

var api = require('../api/login.js');

exports.balance = function (req, res) {
	res.send({
		balance: "1234"
	});
}