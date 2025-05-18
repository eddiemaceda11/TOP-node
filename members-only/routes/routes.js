const { Router } = require('express');
const indexRouter = Router();
const { pgPool } = require('../db/pool');
const bcrypt = require('bcryptjs');
// const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');

// firstname, lastname, username, password

const alphaErr = 'must contain only letters.';
const lengthErr = 'must be between 1 and 25 characters';

const validateUser = [
  body('firstname').trim().isAlpha().withMessage(`First name ${alphaErr}`).isLength({ min: 1, max: 25 }).withMessage(`First name ${lengthErr}`),
  body('lastname').trim().isAlpha().withMessage(`Last name ${alphaErr}`).isLength({ min: 1, max: 25 }).withMessage(`Last name ${lengthErr}`),
  body('username').trim().isLength({ min: 1, max: 25 }).withMessage(`Username ${lengthErr}`),
  body('password').trim().isLength({ min: 1, max: 25 }).withMessage(`Password ${lengthErr}`),
];

indexRouter.get('/', (req, res) => {
  res.render('register', { title: 'Register' });
  const message = 'Welcome to the Members Only Club!';
  console.log(message);
});

indexRouter.post('/register', [
  validateUser,
  async (req, res, next) => {
    const { firstname, lastname, username, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render('');
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await pgPool.query('INSERT INTO members (fullname, username, password, membership_status, isadmin) VALUES ($1, $2, $3, $4, $5)', [`${firstname} ${lastname}`, username, hashedPassword, 'active', false]);
    } catch (err) {
      console.log(err);
      return next(err);
    }
    res.end('User registered successfully');
  },
]);

module.exports = indexRouter;
