const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");

require('dotenv').config();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.use("/", indexRouter);
app.use("/new", newRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("app running");
});

// view the current dbs using the  -  \l command

// connect to the db  -  \c command

// Verify that a table has been created  -  \d command

// We can work with PostgreSQL in our Express application through node-postgres (or pg for short). It is a library that we’ll use to interface with the PostgreSQL db.  -  npm install pg

// to run script  -  node db/populatedb.js