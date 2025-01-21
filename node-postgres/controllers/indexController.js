const db = require("../db/queries");

const usersListGet = async(req, res) => {
  if (Object.keys(req.query).length > 0) {
    const usernames = await db.searchUsernames(req.query.search)
    res.send("Usernames: " + usernames.map(user => user.username).join(", "));
  } else {
    const usernames =  await db.getAllUsernames();
    res.send("Usernames: " + usernames.map(user => user.username).join(", "));
  }
}

const newUsernameGet = async (req, res) => {
  // render the form
}

const newUsernamePost = async (req, res) => {
  const {username} = req.body;
  await db.insertUsername(username);
  res.direct("/");
}

module.exports = {
  usersListGet,
  newUsernameGet,
  newUsernamePost
}