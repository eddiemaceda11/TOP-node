import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import loginRouter from './routes/loginRouter.js';
import './passport-config.js'; // Initialize passport strategy

const app = express();
export const prisma = new PrismaClient();

// Emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express settings
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session middleware with Prisma store
app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
    secret: 'my secret',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, // 2 minutes
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
app.listen(3000, () => {
  console.log('App started on http://localhost:3000');
});
