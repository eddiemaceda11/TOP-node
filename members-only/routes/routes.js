const { Router } = require('express');
const indexRouter = Router();
const { pgPool } = require('../db/pool');
const bcrypt = require('bcryptjs');

indexRouter.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
  const message = 'Welcome to the Members Only Club!';
  console.log(message);
});

indexRouter.post('/register', async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  console.log(firstName, lastName, username, password);
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await pgPool.query('INSERT INTO members (id, fullname, username, password, membership_status, isadmin) VALUES ($1, $2, $3, $4, $5, $6)', [uuidv4(), `${firstName} ${lastName}`, username, hashedPassword, 'active', false]);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.end('Login successful');
});

module.exports = indexRouter;
