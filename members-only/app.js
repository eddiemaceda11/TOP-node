/**
 PROJECT OVERVIEW: I will be building an exclusive clubhouse where members can write anonymous posts. Inside of the clubhouse, members can see who the author of the post is, but outside they can only see the story and wonder who wrote it.

 PROJECT PURPOSE:  The will incorporate the lessons of authentication, databases, and SQL covered to combine into one project.

 PROJECT STEPS:    1)  Brainstorm around the database models that will be needed to   
                    accomplish this project. Requirements include a fullname(first and last), username(email is fine for use), password and membership status. Users need to be able to create messages that have a title, a timestamp and some text. The database should keep track of who created each message. ✓

                   2)  Setup the database on PostgreSQL and generate or create the project skeleton, including the models
                   designed in Step 1. (✓

                   3)  Will begin with a sign-up form to get the users into the database. Requirements include sanitization and validating the form fields, and securing the passwords with bcrypt. Also need to add a confirmPassword field to the sign-up form and then validate it using a custom validator. ✓

                   4)  When users sign up, they should not be automatically given membership status. A page is required where members can "join the club" by entering a secret passcode. If the password is correct, then their membership status will need to be updated. ✓

                   5)  Create a login-form using passport.js. ✓

                   6)  When a user is logged in give them a link to “Create a new message” (but only show it if they’re logged in!). Create the new-message form.
                   
                   7)  Display all member messages on the home page, but only show the author and date of the messages to other club-members.

                   8)  Add an optional field to the user model called Admin and then add the ability to delete messages, but only allow users who have admin == true to see the delete-button and delete messages. You’ll need to add a way to actually mark a user as an ‘admin’ so either add another secret pass-code page, or just put an “is admin” checkbox on the sign-up form.

                   9)  By this point, anyone who comes to the site should be able to see a list of all messages, with the author’s name hidden. Users should be able to sign-up and create messages, but ONLY users that are members should be able to see the author and date of each message. Finally, there should be an Admin user that is able to see everything and also has the ability to delete messages. 

                   10)  Once complete. deploy the project on a chosen PaaS (list of PaaS providers from the Deployment lesson).
 */
// express-session pg passport passport-local
const express = require('express');
const app = express();
const indexRouter = require('./routes/routes');
const { pgPool } = require('./db/pool');
const bcrypt = require('bcryptjs');
const path = require('path');
const passport = require('passport');

//pg-simple session setup
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession); // in place of session
require('dotenv').config();
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// check PostgreSQL connection
pgPool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Connected to PostgresSQL session store!');
    release();
  }
});

// Setting up our express session w/ pg-simple
app.use(
  expressSession({
    store: new pgSession({
      pool: pgPool, // Connection pool,
      tableName: 'pg_session', // Use another table-name than the default "session" one
      // Insert connect-pg-simple options here
      createTableIfMissing: true,
    }),
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

app.use(passport.session()); // gives us access to the req.sessions object
require('./config/passport-config');

app.use('/', indexRouter);

app.listen(3005, () => {
  console.log("Now we're running on Server 3005");
});
