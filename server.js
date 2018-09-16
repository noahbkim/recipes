// mongod --config /usr/local/etc/mongod.conf

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/recipes", { useNewUrlParser: true }).then(() => {

  /* Check if we want to reset the database. */
  if (process.argv.length === 3 && process.argv[2] === "reset") {
    mongoose.connection.db.dropDatabase();
    console.log("Reset database!");
    return;
  }

  /* Check if we're creating a new user. */
  if (process.argv.length === 5 && process.argv[2] === "user") {
    const User = require("./models").User;
    User.register(new User({username: process.argv[3]}), process.argv[4], (err) => {
      if (err) console.log("Error registering user!");
      else console.log("User registered!");
    });
    return;
  }

  /* Create and configure the app. */
  const express = require("express");
  const app = express();
  console.log("Created the express server...");

  /* Cookie parser. */
  app.use(require("cookie-parser")());

  /* Setup JSON parser. */
  const bodyParser = require("body-parser");
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  console.log("Attached JSON body parser...");

  /* Setup authentication. */
  const passport = require("passport");
  const expressSession = require('express-session');
  const User = require("./models").User;
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  app.use(expressSession({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
  app.use(passport.initialize());
  app.use(passport.session());
  console.log("Setup user authentication...");

  /* Use the API endpoint. */
  const router = require("./router.js");
  app.use("/api", router);
  console.log("Connected routes...");

  /* Run the application. */
  const port = process.env.PORT || 8000;
  app.listen(port);
  console.log("Server running on " + port + "!");

});
