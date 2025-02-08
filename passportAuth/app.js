const path = require("node:path");
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
const pg = require("pg");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
app.use(express.urlencoded({ extended: true }));

// pg-simple session setup
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);

const pgPool = new pg.Pool({
  host: "localhost",
  user: "eddiemaceda",
  database: "passport_sessions",
  password: "test",
  port: 5432,
});

app.use(
  expressSession({
    store: new pgSession({
      pool: pgPool, // Connection pool
      tableName: "session_test", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: "cats",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello from sessions");
});

app.listen(3004, () => {
  console.log("Server running for passport prjoect");
});

// TEMP COMMENTS, TO GO IN README
// npm install connect-pg-simple
