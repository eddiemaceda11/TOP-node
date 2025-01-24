const { Router } = require("express");
const propertyRouter = Router();
const propertyController = require("../controllers/propertyController");

propertyRouter.get("/:home_type_id/delete/:property_id", propertyController.deleteProperty);
propertyRouter.get("/:id", propertyController.getProperty);

module.exports = propertyRouter;
