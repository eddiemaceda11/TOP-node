const { Router } = require("express");
const propertyRouter = Router();
const propertyController = require("../controllers/propertyController");

propertyRouter.get("/:id", propertyController.getProperty);

module.exports = propertyRouter;
