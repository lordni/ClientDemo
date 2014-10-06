(function (argument) {
	var dotenv = require('dotenv');
	dotenv.load();

	var express = require("express");
	var logfmt = require("logfmt");

	var login = require('./actions/login.js');
	var authenticated = require('./actions/authenticated.js');
	var passport = require('passport');

	var app = express();
	app.use(logfmt.requestLogger());
	app.use(express.bodyParser());
	app.use(express.favicon());
	app.use(express.static(__dirname + '/public'));

	app.use(express.cookieParser());
	app.use(express.session({ secret: 'this is a secret that should be changed to something better' }));
	app.use(passport.initialize());
	app.use(passport.session());


	app.post('/login',
		passport.authenticate('local', {}),
		function(req, res) {
			console.log("in auth callback");
			res.redirect('/');
		});

	app.get('/balance', authenticated.balance);

	var port = Number(process.env.PORT || 5000);
	app.listen(port, function() {
	  console.log("Listening on " + port);
	});
})();
