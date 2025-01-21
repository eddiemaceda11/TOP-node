const {Router} = require("express");
const propertiesRouter = Router();
const propertiesController = require("../controllers/propertiesController");

propertiesRouter.get("/:type", propertiesController.getCategorizedProperties); 

module.exports = propertiesRouter;