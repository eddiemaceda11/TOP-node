const { Router } = require('express');
const indexRouter = Router();
const { pgPool } = require('../db/pool');
const bcrypt = require('bcryptjs');
// const { v4: uuidv4 } = require('uuid');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

// firstname, lastname, username, password

const alphaErr = 'must contain only letters.';
const lengthErr = 'must be between 1 and 25 characters';

const validateUser = [
  body('firstname')
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`First name ${lengthErr}`),
  body('lastname')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`Last name ${lengthErr}`),
  body('username')
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Username ${lengthErr}`),
  body('password')
    .trim()
    .isLength({ min: 1, max: 25 })
    .withMessage(`Password ${lengthErr}`),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
];

indexRouter.get('/register', (req, res) => {
  res.render('register', { title: 'Register', errors: [] });
  const message = 'Welcome to the Members Only Club!';
  console.log(message);
});

indexRouter.post('/register', [
  validateUser,
  async (req, res, next) => {
    const { firstname, lastname, username, password } = req.body;
    try {
      const errors = validationResult(req);
      console.log(errors.array());
      if (!errors.isEmpty()) {
        return res.status(400).render('register', {
          title: 'Register',
          errors: errors.array(),
        });
      }

      const existingUser = await pgPool.query(
        'SELECT * FROM members WHERE username = $1',
        [username]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).render('register', {
          title: 'Register',
          errors: [{ msg: 'Username already exists' }],
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await pgPool.query(
        'INSERT INTO members (fullname, username, password, membership_status, isadmin) VALUES ($1, $2, $3, $4, $5)',
        [
          `${firstname} ${lastname}`,
          username,
          hashedPassword,
          'inactive',
          false,
        ]
      );
    } catch (err) {
      console.log(err);
      return next(err);
    }
    res.render('confirmMembership', {
      title: 'Confirm Membership',
      username: username,
    });
  },
]);

indexRouter.post(
  '/authenticate',
  passport.authenticate('local', {
    successRedirect: '/confirmMembership',
    failureRedirect: '/register',
  })
);

indexRouter.post('/confirmMembership', async (req, res) => {
  console.log(req.body);
  const { username, membershipCode } = req.body;
  if (membershipCode === process.env.MEMBERSHIP_CODE) {
    await pgPool.query(
      "UPDATE members SET membership_status = 'active' WHERE username = $1",
      [username]
    );
  }
  res.end('Confirmed');
});

/***** LOGIN ******/
indexRouter.get('/login', (req, res) => {
  res.render('index', {
    user: req.user,
  });
});

module.exports = indexRouter;
