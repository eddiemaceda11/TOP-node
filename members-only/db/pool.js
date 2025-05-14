const pg = require('pg');

const pgPool = new pg.Pool({
  host: 'localhost',
  user: process.env.USERNAME,
  database: 'members_only',
  password: process.env.PASSWORD,
  port: 5432,
});

module.exports = { pgPool };
