const {Router} = require("express");
const newRouter = Router();
const newController = require("../controllers/newController");

newRouter.get("/", newController.usersNewGet);
newRouter.post("/", newController.usersNewPost);

module.exports = newRouter;