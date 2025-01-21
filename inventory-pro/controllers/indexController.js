const db = require ("../db/queries");

exports.getIndexPage = async (req, res) => {
  const propertyTypes = await db.getAllProperties();
  console.log(propertyTypes);

  res.render("index", {
    title: "Choose a home type",
    propertyTypes,
  })
}
