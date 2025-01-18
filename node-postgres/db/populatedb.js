#! /usr/bin/env node
const {Client} = require("pg");

// We can also populate our tables via a script
const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username)
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.HOSTNAME}:${process.env.PASSWORD}@localhost:5432/top_users`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

