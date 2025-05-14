const { Pool } = require('pg');

module.exports = new Pool({
  host: 'localhost',
  user: process.env.HOSTNAME,
  database: 'inventory_pro',
  password: process.env.PASSWORD,
  port: 5432,
});
