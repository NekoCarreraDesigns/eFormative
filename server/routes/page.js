// dependencies
const express = require("express");
// router middleware
const pageRoutes = express.Router();
// database connection
const db = require("../db/connection");
// convert string to object
const ObjectId = require("mongodb").ObjectId;
// routes for page with queries to database
pageRoutes.route("/user").get(function (req, res) {
  let db_connect = db.getDb("users");
  db_connect
    .collection("users")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

pageRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = db.getDb();
  let myQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").findOne(myQuery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

pageRoutes.route("/user/add").post(function (req, response) {
  let db_connect = db.getDb();
  let userObj = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
  };
  db_connect.collection("users").insertOne(userObj, function (req, response) {
    if (err) throw err;
    console.log("User has been added!");
    response.json(res);
  });
});

pageRoutes.route("/user/update/:id").post(function (req, response) {
  let db_connect = db.getDb();
  let addQuery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      name: req.name.body,
      username: req.username.body,
    },
  };
  db_connect
    .collection("users")
    .updateOne(addQuery, newValues, function (err, res) {
      if (err) throw err;
      console.log("Update Successful!");
      response.json(res);
    });
});

pageRoutes.route("/:id").delete((req, response) => {
  let db_connect = db.getDb();
  let deleteQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").deleteOne(deleteQuery, function (err, obj) {
    if (err) throw err;
    console.log("User deleted!");
    response.json(obj);
  });
});

module.exports = pageRoutes;
