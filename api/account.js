"use strict";

var http = require('http');

exports.balance = function (customerId) {
	var clientId
	, telenorKey;

	if(process.env.CLIENT_ID === undefined){
		throw "You need to specify CLIENT_ID (in env variables)";
	} else {
		clientId = process.env.CLIENT_ID;
	}

	if(process.env.X_TELENOR_KEY === undefined) {
		throw "You need to specify X_TELENOR_KEY (in env variables)";
	} else {
		telenorKey = process.env.X_TELENOR_KEY;
	}

	var hostname = 'localhost';
	var port = 3000

	var path = '/v2/clients/' + clientId + '/customers/' + customerId + '/account'

	var options = {
		hostname: hostname,
		port: port,
		path: path,
		method: 'GET',
		headers: {
			'X-TELENOR-KEY': telenorKey,
			'content-type': 'application/json'
		}
	};

	var req = http.request(options, function(res) {
		console.log('RESPONSE STATUS: ' + res.statusCode);
		console.log('RESPONSE HEADERS: ' + JSON.stringify(res.headers));
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			console.log('RESPONSE BODY: ' + chunk);
		});
	}).on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});
	req.end();
}