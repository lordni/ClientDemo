'use strict';

(function() {

	var passport = require('passport')
		, LocalStrategy = require('passport-local').Strategy
		, options = {
			usernameField: 'customerId',
			passwordField: 'password'
		};


	var users = [
		{ id: 1, username: '123', password: '123' },
		{ id: 2, username: '456', password: '456' }
	];


	function findById(id, fn) {
		var idx = id - 1;
		if (users[idx]) {
			fn(null, users[idx]);
		} else {
			fn(new Error('User ' + id + ' does not exist'));
		}
	}

	function findByUsername(username, fn) {
		for (var i = 0, len = users.length; i < len; i++) {
			var user = users[i];
			if (user.username === username) {
				return fn(null, user);
			}
		}
		return fn(null, null);
	}

	passport.use(new LocalStrategy(options, function(username, password, done) {
		findByUsername(username, function(err, user) {
			if (err) { return done(err); }

			if (!user) {
				console.log("Couldn't find user");
				return done(null, false, { message: 'Unknown user or password' });
			}

			if (user.password != password) {
				console.log("Faulty password");
				return done(null, false, { message: 'Unknown user or password' }); 
			}

			return done(null, user);
		});
	}));

	passport.serializeUser(function(user, done) {
		console.log("in serializeUser");
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		console.log("in deserializeUser");
		findById(id, function (err, user) {
			done(err, user);
		});
	});

})();
