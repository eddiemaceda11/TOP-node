const db = require("../db/queries");

exports.getProperty = async (req, res) => {
  const { id } = req.params;
  const property = await db.getPropertyById(id);

  res.render("property", {
    title: "Property",
    property,
  });
};

exports.deleteProperty = async (req, res) => {
  const { home_type_id, property_id } = req.params;
  await db.deletePropertyQuery(property_id);
  const categorizedPropertiesID = await db.getPropertiesHomeTypeByID(home_type_id);
  console.log("id: ", categorizedPropertiesID);
  res.redirect(`/properties/${categorizedPropertiesID[0].type}`);
};
