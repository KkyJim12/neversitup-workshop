const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const db = mongoose.connection;

require("./models/User");
require("./models/Order");
require("./models/Product");

mongoose.connect("mongodb://localhost:27017/neversitup", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("connected");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require("./routes/User")(app);
require("./routes/Order")(app);
require("./routes/Product")(app);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
