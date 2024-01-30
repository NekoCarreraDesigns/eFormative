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
// cors setup for backend to frontend communication
// const allowedOrigin = ["https://eformative.com"];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigin.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("not allowed by cors"));
//     }
//   },
// };
// express middleware
// app.use(cors(corsOptions));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(require("./routes/page"));
// code for react serverless functioning
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// connection for the db
const db = require("./db/connection");
// function to make the server listen
app.listen(PORT, () => {
  db.connectToServer(function (err, req, res, next) {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      db.setUpSession(app);
    }
  });
  console.log(`Server is listening on ${PORT}`);
});
