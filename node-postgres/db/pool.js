const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
module.exports = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: process.env.HOSTNAME,
  database: "top_users",
  password: process.env.PASSWORD,
  port: 5432,
})

/*
 An alternative to defining the connection information is through a Connection URI. You’ll likely be using connection URIs when connecting with a hosted database service. *Here’s what it would look like based on the above properties:
 
  const { Pool } = require("pg");

// Again, this should be read from an environment variable
  module.exports = new Pool({
  connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
  });
 */

///////////////////
/************* Two ways of connecting with pg ***************/
/*
pg has two ways to connect to a db: a client and a pool.

Client is an individual connection to the DB, which you manually manage. You open a connection, do your query, then close it. This is fine for one-off queries, but can become expensive if you’re dealing with a lot of queries. Wouldn’t this problem be alleviated if we could somehow hold onto a client? Yes!

Enter pool. As the name suggests, it’s a pool of clients. A pool holds onto connections. And when you query, it’ll programmatically open a new connection unless there’s an existing spare one. Perfect for web servers.
*/