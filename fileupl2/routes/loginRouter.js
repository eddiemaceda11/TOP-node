const { Router } = require('express');
const passport = require('passport');

const loginRouter = Router();

const directory = {
  name: 'root',
  isOpen: true,
  files: [{ name: 'root.txt' }, { name: 'readme.md' }],
  folders: [
    {
      name: 'subfolder1',
      isOpen: false,
      files: [{ name: 'hidden.txt' }],
      folders: [],
    },
    {
      name: 'subfolder2',
      isOpen: true,
      files: [{ name: 'sub2file1.txt' }, { name: 'sub2file2.log' }],
      folders: [
        {
          name: 'nestedFolder1',
          isOpen: true,
          files: [{ name: 'deepfile.md' }],
          folders: [],
        },
        {
          name: 'nestedFolder2',
          isOpen: false,
          files: [{ name: 'hiddenDeep.txt' }],
          folders: [],
        },
      ],
    },
    {
      name: 'subfolder3',
      isOpen: true,
      files: [],
      folders: [],
    },
  ],
};

loginRouter.get('/', (req, res) => {
  res.render('login', {
    user: req.user,
    directory,
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
