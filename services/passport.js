const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

// Model Class
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			// Try to find the user record first,
			// Returns a promise
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					// We already have a record with the given profile Id
					// Do nothing
					done(null, existingUser);
				} else {
					// We don't have a user record with the id, create one
					new User({ googleId: profile.id })
						.save() // save to the db
						.then(user => done(null, user));
				}
			});
		}
	)
);
