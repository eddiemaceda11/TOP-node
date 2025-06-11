const { Router } = require('express');
const registerRouter = Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { prisma } = require('../prismaClient.js');

registerRouter.get('/', (req, res) => {
  res.render('register', { title: 'Register', errors: [] });
});

registerRouter.post('/', async (req, res) => {
  const { username, firstname, lastname, password } = req.body;
  console.log(username, firstname, lastname, password);
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email: username,
        name: `${firstname} ${lastname}`,
        password: hashedPassword,
      },
    });
    console.log(user);
  } catch (err) {
    console.log(err);
    return res.redirect('/register');
  }
  res.end('Done');
});

module.exports = registerRouter;
