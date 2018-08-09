var passport = require('passport');

module.exports = function(app) {
		app.use(passport.initialize());
		app.use(passport.session());
		passport.serializeUser(function(user, done){
			done(null, user,token);
			console.log("serialized user:"+token);

		});

		passport.deserializeUser(function(user, done){
			done(null, user,token);
			console.log("deserialized user:"+user);
		});

		require('./strategies/local.strategy.js')(app);
};
