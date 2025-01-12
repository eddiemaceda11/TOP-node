const {body, validationResult} = require("express-validator");
const usersStorage = require("../storages/usersStorage");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
  body("firstName")
    .trim().isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim().isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({min: 1, max: 10}).withMessage(`Last name ${lengthErr}`)
]

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers()
  })
}

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  })
}

// We can pass an entire array of middleware validations to our controller.
exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      })
    }
    const {firstName, lastName} = req.body;
    usersStorage.addUser({firstName, lastName});
    res.redirect("/");
  }
]

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  })
}

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array()
      })
    }
    const {firstName, lastName} = req.body;
    usersStorage.updateUser(req.params.id, {firstName, lastName});
    res.redirect("/");
  }
]

// Tell the server to delete a matching user, if any. Otherwise, respond with an error.
exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect("/");
}

// Form data that has been sent via a GET request will not be available via req.body. You will need to use req.query instead.
exports.usersSearchGet = (req, res) => {
  const results = usersStorage.searchUser(req.query.fullName);
  console.log("Results: ", results);
  res.render("search", {
    user: results
  })
}