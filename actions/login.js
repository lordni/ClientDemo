'use strict';

var api = require('../api/login.js');

exports.create = function(req, res) {
	var username = req.body.customerId
		, password = req.body.password;

	if(api.login(username, password)) {
		res.send('hello');
	}
	else {
		res.statusCode = 401;
		res.send("Unauthorized!");
	}
};
