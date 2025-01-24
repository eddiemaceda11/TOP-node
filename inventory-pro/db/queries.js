const pool = require("./pool");

async function getAllProperties() {
  const { rows } = await pool.query("SELECT * FROM home_type");
  return rows;
}

async function getPropertiesHomeTypeByID(id) {
  const { rows } = await pool.query("SELECT type FROM home_type WHERE id = ($1) LIMIT 1", [id]);
  return rows;
}

async function getPropertiesByHomeType(type) {
  const { rows } = await pool.query("SELECT * FROM home_type INNER JOIN property ON property.home_type_id = home_type.id WHERE home_type.type = $1", [type]);
  return rows;
}

async function getPropertyById(id) {
  const { rows } = await pool.query("SELECT * FROM property WHERE id = ($1)", [id]);
  return rows;
}

async function deletePropertyQuery(id) {
  const { rows } = await pool.query("DELETE FROM property WHERE id = ($1)", [id]);
  console.log("Deleted rows: ", rows);
  return rows;
}

module.exports = {
  getAllProperties,
  getPropertiesHomeTypeByID,
  getPropertiesByHomeType,
  getPropertyById,
  deletePropertyQuery,
};
