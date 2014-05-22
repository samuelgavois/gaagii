'use strict';


var IndexModel = require('../models/index');
var nconf = require('nconf');
var passport = require('passport'), GoogleStrategy = require('passport-google').Strategy;
var User = require('../models/user');

passport.use(new GoogleStrategy(
	{returnURL : 'http://ks3310836.kimsufi.com:8000/auth/google/return', realm : 'http://ks3310836.kimsufi.com:8000/'},
	function(identifier, profile, done) {
		console.log(identifier);
		console.log(profile);
		console.log(done);
		
		process.nextTick(function () {
      		// To keep the example simple, the user's Google profile is returned to
      		// represent the logged-in user.  In a typical application, you would want
      		// to associate the Google account with a user record in your database,
      		// and return that user instead.
      		profile.identifier = identifier;
      		return done(null, profile);
    	});
		
		/*User.findOrCreate({openId: identifier}, function(err, user) {
			done(err, user);
		});*/
	}
));

module.exports = function (app) {
   	var model = new IndexModel();
	app.get('/', function (req, res) {
	        res.locals.context = { locality: nconf.get("locale") };
	        res.render('index', model);
	    
   	});

	app.get('/auth/google', 
		passport.authenticate('google', { failureRedirect: '/login' }),
  		function(req, res) {
    		res.redirect('/');
  		}
	);
	app.get('/auth/google/return', 
		passport.authenticate('google', { failureRedirect: '/login' }),
  		function(req, res) {
    		res.redirect('/');
  		}
	);
};
