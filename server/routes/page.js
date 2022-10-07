// dependencies
const express = require("express");
// router middleware
const pageRoutes = express.Router();
// database connection
const db = require("../db/connection");
const models = require("../db/models");
// convert string to object
const ObjectId = require("mongodb").ObjectId;
// routes for users with queries to database
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
  db_connect.collection("users").insertOne(userObj, function (err, res) {
    if (err) throw err;
    console.log("User has been added!");
    response.json(userObj);
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
      // response.json();
    });
});

pageRoutes.route("/user/:id").delete((req, response) => {
  let db_connect = db.getDb();
  let deleteQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("users").deleteOne(deleteQuery, function (err, obj) {
    if (err) throw err;
    console.log("User deleted!");
    response.json(obj);
  });
});

// routes for reviews of sellers and product
pageRoutes.route("/reviews").get(function (req, res) {
  let db_connect = db.getDb();
  db_connect
    .collection("reviews")
    .find({})
    .toArray(function (req, result) {
      if (err) res.status(404);
      res.json(result);
    });
});

pageRoutes.route("/seller/reviews/:id").get(function (req, res) {
  let db_connect = db.getDb();
  let sellerQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("reviews").findOne(sellerQuery, function (req, result) {
    if (err) res.status(404);
    res.json(result);
  });
});

pageRoutes.route("/product/reviews/:id").get(function (req, res) {
  let db_connect = db.getDb();
  let productQuery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("reviews")
    .findOne(productQuery, function (req, result) {
      if (err) res.status(404);
      res.json(result);
    });
});

pageRoutes.route("/product/reviews/post").post(function (req, res) {
  let db_connect = db.getDb();
  let postObj = {
    sellerName: req.body.sellerName,
    productName: req.body.productName,
    review: req.body.review,
  };
  db_connect.collection("reviews").insertOne(postObj, function (err, result) {
    if (err) res.status(404);
    res.json(result);
  });
});

pageRoutes.route("/reviews/update/:id").post(function (req, response) {
  let db_connect = db.getDb();
  let updatePostQuery = { _id: ObjectId(req.params.id) };
  let newPostValues = {
    $set: {
      sellerName: req.sellerName.body,
      productName: req.productName.body,
      review: req.review.body,
    },
  };
  db_connect
    .collection("reviews")
    .updateOne(updatePostQuery, newPostValues, function (err, res) {
      if (err) res.status(404);
      console.log("Update Successful!");
      response.json();
    });
});

pageRoutes.route("/reviews/:id").delete((req, response) => {
  let db_connect = db.getDb();
  let deleteReviewQuery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("reviews")
    .deleteOne(deleteReviewQuery, function (err, obj) {
      if (err) res.status(404);
      console.log("Review deleted!");
      response.json(obj);
    });
});

module.exports = pageRoutes;
