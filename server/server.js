// dependencies for app
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");
// configuration for dotenv
require("dotenv").config({ path: "./config.env" });
// declaring the port to be used for the server
const PORT = process.env.PORT || 3001;
// express middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(require("./routes/page"));
// code for react serverless functioning
app.use(express.static(path.join(__dirname, "client/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
// connection for the db
const db = require("./db/connection");
// function to make the server listen
app.listen(PORT, () => {
  db.connectToServer(function (err, res) {
    if (err) {
      res.status(500).send({ message: "internal server error" });
    } else {
      db.setUpSession(app);
    }
  });
  console.log(`Server is listening on ${PORT}`);
});
