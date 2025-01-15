exports.usersNewGet = (req, res) => {
  res.render("newUser", {
  })
  res.end()
}

exports.usersNewPost = (req, res) => {
  console.log("Username to be saved: ", req.body.username);
  res.end()
}

