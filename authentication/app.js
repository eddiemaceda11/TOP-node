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

// This function is what will be called when we use the passport.authenticate() function later.
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
