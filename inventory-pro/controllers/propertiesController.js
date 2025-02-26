const db = require("../db/queries");

exports.getCategorizedProperties = async (req, res) => {
  const categorizedProperties = await db.getPropertiesByHomeType(req.params.type);

  res.render("properties", {
    title: "Properties",
    categorizedProperties,
  });
};
