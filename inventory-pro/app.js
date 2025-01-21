const express = require("express");
const app = express();

require("dotenv").config();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

const indexRouter = require("./routes/indexRouter");
const propertiesRouter = require("./routes/propertiesRouter");
const propertyRouter = require("./routes/propertyRouter");

app.use("/", indexRouter);
app.use("/properties", propertiesRouter);
app.use("/property", propertyRouter);

const PORT = 3300;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
  
})








