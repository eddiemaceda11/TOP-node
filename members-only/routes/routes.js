const { Router } = require("express");
const router = Router();

router.get("/", (req, res, next) => {
  res.send("Home Page");
});

router.get("/sign-up", (req, res, next) => {
  res.send("Sign up");
});

module.exports = router;
