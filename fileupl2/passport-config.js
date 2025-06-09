const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { prisma } = require('./index.js');

// Local Strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err);
    }
  })
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
