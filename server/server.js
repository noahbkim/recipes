const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// mongod --config /usr/local/etc/mongod.conf

mongoose.connect("mongodb://localhost:27017/recipes", { useNewUrlParser: true }).then(() => {

  /* Check if we want to reset the database. */
  if (process.argv.length === 3 && process.argv[2] === "reset") {
    mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
    return;
  }

  const router = require("./router.js");

  /* Create and configure the app. */
  const app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  /* Use the API endpoint. */
  app.use("/api", router);

  /* Run the application. */
  const port = process.env.PORT || 8000;
  app.listen(port);
  console.log("Server running on " + port);

});
