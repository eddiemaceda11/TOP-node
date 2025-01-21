const db = require("../db/queries");

exports.getCategorizedProperties = async (req, res) => {
  const propertiesCategorized = await db.getPropertiesByHomeType(req.params.type);
  console.log("Category: ", propertiesCategorized);

  res.render("properties", {
    title: "Properties"
  })
}

