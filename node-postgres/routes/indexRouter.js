const {Router} = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.usersListGet);
// indexRouter.get("/delete", indexController);

module.exports = indexRouter;