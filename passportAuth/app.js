const path = require("node:path");
const bcrypt = require("bcryptjs");
// const { Pool } = require("pg");
const pg = require("pg");
const express = require("express");
const session = require("express-session");
const app = express();
// pg-simple session setup
const expressSession = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(expressSession);
const router = require("./routes/index");

require("dotenv").config();

const pgPool = new pg.Pool({
  host: "localhost",
  user: process.env.HOSTNAME,
  database: "passport_sessions",
  password: process.env.PASSWORD,
  port: 5432,
});

module.exports = { pgPool };

// Check PostgreSQL connection
pgPool.connect((err, client, release) => {
  if (err) {
    console.error("Error acquiring client", err.stack);
  } else {
    console.log("Connected to PostgreSQL session store!");
    release();
  }
});

// Setting up our express session w/ pg-simple
app.use(
  expressSession({
    store: new pgSession({
      pool: pgPool, // Connection pool
      tableName: "session_test", // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
    }),
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(passport.session()); // gives us access to the req.sessions object
require("./config/passport");

// custom middleware
app.use((req, res, next) => {
  console.log(req.session);
  // console.log(req.user);
  next();
});

app.use("/", router);

app.listen(3004, () => {
  console.log("Server running for passport prjoect");
});

// TEMP COMMENTS, TO GO IN README
// npm install connect-pg-simple
