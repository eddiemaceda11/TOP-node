const pool = require("./pool");

async function getAllProperties() {
  const {rows} = await pool.query("SELECT * FROM home_type");
  return rows;
}

async function getPropertiesByHomeType(type) {
  const {rows} = await pool.query("SELECT * FROM property INNER JOIN home_type ON property.home_type_id = home_type.id WHERE home_type.type = ($1)", [type]);
  return rows;
}

module.exports = {
  getAllProperties,
  getPropertiesByHomeType,
}