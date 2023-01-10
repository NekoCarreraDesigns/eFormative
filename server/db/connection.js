// dependencies and imports
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { MongoClient } = require("mongodb");
// variables
const Db = process.env.ATLAS_URI;

const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;
// exports  for db connection
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (db) {
        _db = db.db("eformative0");
        console.log("Successfully connected to mongoDB!");
      }
      return callback(err);
    });
  },
  setUpSession: function (app) {
    app.use(
      session({
        secret: "Wednesday's child is full of woe",
        store: new MongoStore({
          client: client,
          db: _db,
          stringify: false,
        }),
        resave: false,
        saveUninitialized: true,
      })
    );
  },

  getDb: function () {
    return _db;
  },
};
