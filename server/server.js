// dependencies for app
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
// configuration for dotenv
require("dotenv").config({ path: "./config.env" });
// declaring the port to be used for the server
const port = process.env.PORT || 3001;
// express middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(require("./routes/page"));
// connection for the db
const db = require("./db/connection");
// function to make the server listen
app.listen(port, () => {
  db.connectToServer(function (err, res) {
    if (err) {
      res.status(500).send({ message: "internal server error" });
    } else {
      db.setUpSession(app);
    }
  });
  console.log(`Server is listening on ${port}`);
});
