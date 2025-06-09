const express = require('express');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session');
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma');
const { withAccelerate } = require('@prisma/extension-accelerate');
const loginRouter = require('./routes/loginRouter.js');
require('./passport-config.js'); // Initialize passport strategy

const app = express();
const prisma = new PrismaClient().$extends(withAccelerate());
module.exports = prisma;

app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    secret: 'a santa at nasa',
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session()); // Persistent login sessions

// Routes
app.use('/login', loginRouter);

// Start server
app.listen(3005, () => {
  console.log('App started on http://localhost:3005');
});
