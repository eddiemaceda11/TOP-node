const { Router } = require('express');
const passport = require('passport');

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
  res.render('login', {
    user: req.user,
  });
});

loginRouter.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/login',
    failureRedirect: '/login', // fixed typo: "filureRedirect" -> "failureRedirect"
  })
);

module.exports = loginRouter;
