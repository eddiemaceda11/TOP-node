import { Router } from 'express';
import passport from 'passport';

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
  res.render('login', {
    user: req.user,
  });
});

loginRouter.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/', // fixed typo: "filureRedirect" -> "failureRedirect"
  })
);

export default loginRouter;
