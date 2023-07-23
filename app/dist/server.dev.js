"use strict";

require('dotenv').config();

var express = require("express");

var cors = require("cors");

var path = require("path");

var app = express(); // var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
// enable cors

app.use(cors());
app.options('*', cors()); // parse requests of content-type - application/json

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views')); // parse requests of content-type - application/x-www-form-urlencoded

app.use(express.urlencoded({
  extended: true
}));

var db = require("./models");

db.sequelize.sync().then(function () {
  console.log("Synced database.");
})["catch"](function (err) {
  console.log("Failed to sync database: " + err.message);
}); // // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });
// simple route

app.get("/", function (req, res) {
  res.render('home.ejs');
});

require("./routes/tutorial.routes")(app);

require("./routes/tutorial.api")(app); // set port, listen for requests


var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT, "."));
});