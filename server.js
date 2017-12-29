const express = require("express");
const bodyParser = require("body-parser");

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
