const db = require("../db/queries");

exports.getProperty = async (req, res) => {
  const { id } = req.params;
  const property = await db.getPropertyById(id);
  console.log("Id is: ", property);

  res.render("property", {
    title: "Property",
  });
};
