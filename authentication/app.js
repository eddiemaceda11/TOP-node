const path = require("node:path");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

require("dotenv").config();
const pool = new Pool({
  host: "localhost",
  user: process.env.HOSTNAME,
  database: "authentication",
  password: process.env.PASSWORD,
  port: 5432,
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// This function is what will be called when we use the passport.authenticate() function later. Basically, it takes a username and password, tries to find the user in our DB, and then makes sure that the user’s password matches the given password. If all of that works out (there’s a user in the DB, and the passwords match) then it authenticates our user and moves on! We will not be calling this function directly, so you won’t have to supply the done function. This function acts a bit like a middleware and will be called for us when we ask passport to do the authentication later.
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// passport.serializeUser takes a callback which contains the information we wish to store in the session data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// passport.deserializeUser is called when retrieving a session, where it will extract the data we “serialized” in it then ultimately attach something to the .user property of the request object (req.user) for use in the rest of the request.
passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
  } catch (err) {
    done(err);
  }
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up-form");
});
app.post("/sign-up", async (req, res, next) => {
  console.log(req.body.username, req.body.password);
  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [req.body.username, req.body.password]);
    res.redirect("/");
  } catch (err) {
    return next(err);
  }
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

//**NOTES FOR THE SERIALIZE + DESERIALIZE FUNCTIONS ABOVE**//
// When a session is created, passport.serializeUser will receive the user object found from a successful login and store its id property in the session data. Upon some other request, if it finds a matching session for that request, passport.deserializeUser will retrieve the id we stored in the session data. We then use that id to query our database for the specified user, then done(null, user) attaches that user object to req.user. Now in the rest of the request, we have access to that user object via req.user.

// Again, we aren’t going to be calling these functions on our own and we just need to define them, they’re used in the background by passport.
