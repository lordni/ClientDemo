"use strict";

(function() {

	var clientId
	, telenorKey
	, api_endpoint;

	if(process.env.CLIENT_ID === undefined) {
		throw "You need to specify CLIENT_ID (in env variables)";
	} else {
		clientId = process.env.CLIENT_ID;
	}

	if(process.env.X_TELENOR_KEY === undefined) {
		throw "You need to specify X_TELENOR_KEY (in env variables)";
	} else {
		telenorKey = process.env.X_TELENOR_KEY;
	}

	if(process.env.API_ENDPOINT === undefined) {
		throw "You need to specify API_ENDPOINT (in env variables)";
	} else {
		api_endpoint = process.env.API_ENDPOINT;
	}

	var http = require('http');
	var q = require('q');
	var request = require('request');

	exports.balance = function (customerId) {

		var path = '/v2/clients/' + clientId + '/customers/' + customerId + '/account'

		var options = {
			url: api_endpoint + path,
			headers: {
				'X-TELENOR-KEY': telenorKey,
				'content-type': 'application/json'
			}
		};

		var deferred = q.defer();

		var responseIsIn200Range = function (response) {
			return response !== undefined
				&& response.statusCode !== undefined
				&& response.statusCode.toString().substring(0,1) === "2"
		}

		request(options, function (error, response, body) {
			var noError = error === undefined || error === null;
			if(noError && responseIsIn200Range(response)){
				console.log("success");
				var json = JSON.parse(body);
				deferred.resolve({balance: json.Balance});
			}
			else {
				console.log("error:" + error);
				deferred.reject("error" + body);
			}
		});

		return deferred.promise;
	}
})();
