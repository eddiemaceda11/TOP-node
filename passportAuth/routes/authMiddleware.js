module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("Authenticated");
    next();
  } else {
    res.json({ message: "You are not authorized to view this message" });
  }
};
