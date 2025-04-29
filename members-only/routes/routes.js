const { Router } = require('express');
const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
  const message = 'Welcome to the Members Only Club!';
  console.log(message);
});

indexRouter.post('/login', (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  console.log(firstName, lastName, username, password);
  res.end('Login successful');
});

module.exports = indexRouter;
