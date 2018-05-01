const passport = require("passport");

// attach app
module.exports = app => {
	// Create a route for handling google authentication
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	// Create a route for handling google callback
	app.get("/auth/google/callback", passport.authenticate("google"));

	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});
};
