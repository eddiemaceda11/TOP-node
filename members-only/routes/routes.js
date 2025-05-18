const { Router } = require('express');
const indexRouter = Router();
const { pgPool } = require('../db/pool');
const bcrypt = require('bcryptjs');
// const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');

// firstname, lastname, username, password

const alphaErr = 'must contain only letters.';
const lengthErr = 'must be between 1 and 25 characters';

indexRouter.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
  const message = 'Welcome to the Members Only Club!';
  console.log(message);
});

indexRouter.post('/register', async (req, res, next) => {
  const { firstname, lastname, username, password } = req.body;

  console.log(firstname, lastname, username, password);
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    await pgPool.query('INSERT INTO members (fullname, username, password, membership_status, isadmin) VALUES ($1, $2, $3, $4, $5)', [`${firstname} ${lastname}`, username, hashedPassword, 'active', false]);
  } catch (err) {
    console.log(err);
    return next(err);
  }

  res.end('Login successful');
});

module.exports = indexRouter;
