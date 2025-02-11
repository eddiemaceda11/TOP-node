const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { pgPool } = require("../app");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pgPool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      // return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Putting the user id into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});
