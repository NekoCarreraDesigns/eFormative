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

pageRoutes.route("/user/update/:id").put(function (req, response) {
  let db_connect = db.getDb();
  let addQuery = { _id: ObjectId(req.params.id) };
  let newValues = {
    $set: {
      name: req.body.name,
      username: req.body.username,
    },
  };
  db_connect
    .collection("users")
    .updateOne(addQuery, newValues, function (err, result) {
      if (err) res.status(404);
      console.log("Update Successful!");
      response.json(result);
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
    .toArray(function (err, result) {
      if (err) res.status(404);
      res.json(result);
    });
});

pageRoutes.route("/seller/reviews/:id").get(function (req, res) {
  let db_connect = db.getDb();
  let sellerQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("reviews").findOne(sellerQuery, function (err, result) {
    if (err) res.status(404);
    res.json(result);
  });
});

pageRoutes.route("/product/reviews/:id").get(function (req, res) {
  let db_connect = db.getDb();
  let productQuery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("reviews")
    .findOne(productQuery, function (err, result) {
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
    console.log("Review added!");
    res.json(result);
  });
});

pageRoutes.route("/reviews/update/:id").put(function (req, response) {
  let db_connect = db.getDb();
  let updatePostQuery = { _id: ObjectId(req.params.id) };
  let newPostValues = {
    $set: {
      sellerName: req.body.sellerName,
      productName: req.body.productName,
      review: req.body.review,
    },
  };
  db_connect
    .collection("reviews")
    .updateOne(updatePostQuery, newPostValues, function (err, res) {
      if (err) res.status(404);
      console.log("Update Successful!");
      response.json(res);
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

// routes for selling items on the page and the market
// also the route to show all the items for sale
pageRoutes.route("/market").get(function (req, res) {
  let db_connect = db.getDb();
  db_connect
    .collection("items")
    .find({})
    .toArray(function (err, result) {
      if (err) res.status(404);
      res.json(result);
    });
});
// this is for the seller page, to show items the user has sold
pageRoutes.route("/items/sold/:id").get(function (req, res) {
  let db_connect = db.getDb();
  let itemQuery = { _id: ObjectId(req.params.id) };
  db_connect.collection("items").findOne(itemQuery, function (err, result) {
    if (err) res.status(404);
    res.json(result);
  });
});

pageRoutes.route("/items/update/:id").put(function (req, res) {
  let db_connect = db.getDb();
  let updateItemQuery = { _id: ObjectId(req.params.id) };
  let newItemValues = {
    $set: {
      product: req.body.product,
      price: req.body.price,
      description: req.body.description,
    },
  };
  db_connect
    .collection("items")
    .updateOne(updateItemQuery, newItemValues, function (err, result) {
      if (err) res.status(404);
      console.log("Item updated!");
      res.json(result);
    });
});

pageRoutes.route("/items/add").post(function (req, res) {
  let db_connect = db.getDb();
  let itemObj = {
    sellerName: req.body.sellerName,
    product: req.body.product,
    price: req.body.price,
    description: req.body.description,
  };
  db_connect.collection("items").insertOne(itemObj, function (err, result) {
    if (err) res.status(404);
    console.log("Item added!");
    res.json(result);
  });
});

pageRoutes.route("/items/:id").delete(function (req, res) {
  let db_connect = db.getDb();
  let removeItemQuery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("items")
    .deleteOne(removeItemQuery, function (err, result) {
      if (err) res.status(404);
      console.log("Item deleted!");
      res.json(result);
    });
});

module.exports = pageRoutes;
