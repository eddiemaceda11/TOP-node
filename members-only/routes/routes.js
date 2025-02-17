const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.send("Home Page");
});

router.get("/sign-up", (req, res, next) => {
  res.send("Sign up");
});

router.get("/login", (req, res, next) => {
  res.send("Login Page");
});

module.exports = router;
