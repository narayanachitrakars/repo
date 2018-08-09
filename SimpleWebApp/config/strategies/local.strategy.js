var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Strategy = require('passport-http').DigestStrategy;
var user = require('../../models/userdetail');
var jwt = require('jsonwebtoken'); 
var express = require('express');
var app = express();
app.set('superSecret', 'library');

module.exports = function() {
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',	
	}, 
	function (userid, pwd, done){
			 user.model.find({ email:userid,password:pwd}).
	 				exec(
				function(err, results) {
						if(results.length !=0)
						{
	                    	var user= results[0];
	                    	var payload = {
											user: results[0]	
											}
							token = jwt.sign(payload, app.get('superSecret'), {
								// expiresIn: 86400 // expires in 24 hours
							});
							 done(null, user,token);
						}
						else
						{
							 done(null, false, {message: 'Invalid username or password'});

						}
                   				
			});
		}));
};
