const path = require("node:path");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const session = require("express-session");

// pg-simple session setup
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      // Insert connect-pg-simple options here
    }),
    secret: process.env.FOO_COOKIE_SECRET,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(3004, () => {
  console.log("Server running for passport prjoect");
});

// TEMP COMMENTS, TO GO IN README
// npm install connect-pg-simple
