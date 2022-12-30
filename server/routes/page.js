// dependencies
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// router middleware
const pageRoutes = express.Router();
// database connection
const db = require("../db/connection");
// convert string to object
const ObjectId = require("mongodb").ObjectId;

const secret = process.env.JWT_SECRET;

// user sign up that redirects to the seller page
pageRoutes.route("/seller").post(async (req, response) => {
  const { fullName, username, password } = req.body;
  const hash = await bcrypt.hash(password, 13);
  let db_connect = db.getDb();
  let newUserObj = {
    fullName: req.body.fullName,
    username: req.body.username,
    email: req.body.email,
    password: hash,
  };
  db_connect
    .collection("users")
    .insertOne(newUserObj, async function (err, res) {
      if (err) {
        console.error(err);
        response.status(500).send({ error: "internal server error" });
      } else {
        db_connect
          .collection("users")
          .findOne({ username: req.body.username }, function (err, res) {
            if (err) {
              console.error(err);
              response.status(500).send({ error: "internal server err" });
            } else if (res !== null) {
              response.status(400).send({ message: "username already exists" });
            } else {
              response.json({ message: "hello new user!" });
            }
          });
      }
    });
});

pageRoutes.route("/sign-in").post(async (req, res) => {
  let db_connect = db.getDb();
  const { username, password } = req.body;
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: "username and password required" });
  }
  const user = await db_connect.collection("users").findOne({ username });
  if (!user) {
    res.status(404).send({ message: "user not found" });
    return;
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    res.status(401).send({ message: "password is incorrect" });
  } else {
    const token = jwt.sign({ user }, secret, {
      expiresIn: "2h",
    });
    res.cookie("jwt", token, { httpOnly: true });
    res.send({ message: "sign in successful" });
  }
});

// routes for users with queries to database
pageRoutes.route("/user").get(function (req, res) {
  let db_connect = db.getDb("users");
  const userId = req.user && req.user.id;
  db_connect.collection("users").findOne({ _id: userId }, function (err, user) {
    if (err) {
      res.status(500).send("error fetching from database");
    } else {
      res.status(200).send(user);
    }
  });
});

pageRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = db.getDb();
  let myQuery = { _id: req.params.id };
  db_connect.collection("users").findOne(myQuery, function (err, result) {
    if (err) {
      res.status(400).send({ message: "User not found!" });
    }
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
  if (!req.body.name || !req.body.username || !req.body.password) {
    res.status(400).send({ message: "name, username, and password required!" });
    return;
  }
  db_connect.collection("users").insertOne(userObj, function (err, res) {
    if (err) {
      res.status(500).send({ message: "internal server error!" });
    }
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
      if (err) {
        console.error(err);
        response.status(500).send({ message: "internal server error!" });
      } else {
        console.log("Update Successful!");
      }
    });
});

pageRoutes.route("/user/:id").delete((req, response) => {
  try {
    let db_connect = db.getDb();
    let deleteQuery = { _id: ObjectId(req.params.id) };
    db_connect.collection("users").deleteOne(deleteQuery, function (err, obj) {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "internal server error" });
      }
      console.log("User deleted!");
      response.json(obj);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "internal server error" });
  }
});

// routes for reviews of sellers and product
pageRoutes.route("/reviews").get(function (req, res) {
  try {
    let db_connect = db.getDb("reviews");
    db_connect
      .collection("reviews")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send({ message: "internal server error" });
        }
        res.json(result);
      });
  } catch (err) {
    res.status(404).send({ message: "Not found!" });
  }
});

pageRoutes.route("/seller/reviews/post").post(function (req, res) {
  let db_connect = db.getDb();
  let sellerQuery = {
    reviewerName: req.body.reviewerName,
    sellerName: req.body.sellerName,
    sellerReview: req.body.review,
  };
  db_connect
    .collection("sellerReviews")
    .insertOne(sellerQuery, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "internal server error" });
      }
      res.json(result);
    });
});

pageRoutes.route("/seller/reviews").get(function (req, res) {
  try {
    let db_connect = db.getDb();
    db_connect
      .collection("sellerReviews")
      .find({})
      .toArray(function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send({ message: "internal server error" });
          return;
        }
        res.json(result);
      });
  } catch (err) {
    console.error(err);
    res.status(404).send({ message: "reviews not found" });
  }
});

pageRoutes.route("/product/reviews/:id").get(function (req, res) {
  let db_connect = db.getDb();
  let productQuery = { product: req.params.id };
  db_connect
    .collection("reviews")
    .find(productQuery)
    .toArray(function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "internal server error" });
        return;
      }
      if (!result) {
        res.status(404).send({ message: "review not found!" });
      }
      res.json(result);
    });
});

pageRoutes.route("/product/reviews/post").post(function (req, res) {
  let db_connect = db.getDb();
  let postObj = {
    reviewerName: req.body.reviewerName,
    sellerName: req.body.sellerName,
    product: req.body.product,
    review: req.body.review,
  };
  if (
    !req.body.reviewerName ||
    !req.body.sellerName ||
    !req.body.product ||
    !req.body.review
  ) {
    res.status(400).send({ message: "All fields are required" });
  }
  db_connect.collection("reviews").insertOne(postObj, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "internal server error" });
    }
    console.log("Review added!");
    res.json(result);
  });
});

pageRoutes.route("/reviews/update/:id").put(function (req, res) {
  let db_connect = db.getDb();
  let updatePostQuery = { _id: ObjectId(req.params.id) };
  let newPostValues = {
    sellerName: req.body.sellerName,
    productName: req.body.productName,
    review: req.body.review,
  };
  db_connect
    .collection("reviews")
    .updateOne(updatePostQuery, newPostValues, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "internal server error" });
      }
      console.log("Update Successful!");
      res.json(result);
    });
});

pageRoutes.route("/reviews/:id").delete((req, res) => {
  try {
    let db_connect = db.getDb();
    let deleteReviewQuery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("reviews")
      .deleteOne(deleteReviewQuery, function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send({ message: "internal server error" });
        }
        if (result.deletedCount === 0) {
          res.status(404).send({ message: "review not found" });
        }
        console.log("Review deleted!");
        res.json(result);
      });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "invalid id" });
  }
});

// routes for selling items on the page and the market
// also the route to show all the items for sale
pageRoutes.route("/market").get(function (req, res) {
  let db_connect = db.getDb();
  let searchParams = req.query;
  let searchCriteria = {};
  if (searchParams.sellerName) {
    searchCriteria.sellerName = searchParams.sellerName;
  }
  if (searchParams.product) {
    searchCriteria.product = searchParams.product;
  }
  if (searchParams.price) {
    searchCriteria.price = searchParams.price;
  }
  db_connect
    .collection("items")
    .find({})
    .toArray(function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "internal server error" });
      }
      res.json(result);
    });
});

pageRoutes.route("/market/sellers").get(function (req, res) {
  let db_connect = db.getDb();
  let sellerName = req.query.sellerName;
  // db_connect.collection("items").dropIndex(sellerName);
  // db_connect.collection("items").createIndex({ "$**": "text" });
  if (typeof sellerName === "string" && sellerName.trim().length > 0) {
    db_connect
      .collection("items")
      .find({ $text: { $search: sellerName } })
      .toArray(function (err, sellers) {
        if (err) {
          console.error(err);
          res.status(400).send({ message: "Item is not found" });
        }
        console.log(sellers);
        res.json(sellers);
      });
  }
});

pageRoutes.route("/market/products").get(function (req, res) {
  let db_connect = db.getDb();
  let product = req.query.product;
  db_connect.collection("items").createIndex({ "$**": "text" });
  db_connect
    .collection("items")
    .find({ $text: { $search: product } })
    .toArray(function (err, products) {
      if (err) res.send("Error");
      console.log(products);
    });
});

pageRoutes.route("/market/price").get(function (req, res) {
  let db_connect = db.getDb();
  let price = req.query.price;
  db_connect.collection("items").createIndex({ "$**": "text" });
  db_connect
    .collection("items")
    .find({ $text: { $search: price } })
    .toArray(function (err, prices) {
      if (err) res.send("error");
      console.log(prices);
    });
});

// this is for the seller page, to show items the user has sold
pageRoutes.route("/items/sold/").get(function (req, res) {
  let db_connect = db.getDb();
  let itemQuery = { itemSold: true };
  db_connect.collection("items").find(itemQuery, function (err, result) {
    if (err) {
      console.error(err);
      res.status(404).send({ message: "not found" });
    }
    res.json(result);
  });
});

pageRoutes.route("/items/selling/").get(function (req, res) {
  let db_connect = db.getDb();
  let itemQuery = { itemSold: false };
  db_connect.collection("items").find(itemQuery, function (err, result) {
    if (err) {
      res.status(500).send({ message: "internal server error" });
    }
    res.json(result);
  });
});

pageRoutes.route("/items/update/:id").put(function (req, res) {
  let db_connect = db.getDb();
  let updateItemQuery = { _id: ObjectId(req.params.id) };
  let newItemValues = {
    product: req.body.product,
    price: req.body.price,
    description: req.body.description,
  };
  if (!req.body.product || !req.body.price || !req.body.description) {
    res.status(400).send({ message: "all fields are required" });
  }
  db_connect
    .collection("items")
    .updateOne(updateItemQuery, newItemValues, function (err, result) {
      if (err) {
        console.error(err);
        res.status(500).send({ message: "internal server error" });
      }
      if (result.modifiedCount === 0) {
        console.error(err);
        res.status(404).send("item cannot be found");
      }
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
    image: req.body.image,
    description: req.body.description,
    itemSold: false,
  };
  if (
    !req.body.sellerName ||
    !req.body.product ||
    !req.body.price ||
    !req.body.description
  ) {
    res.status(400).send({ message: "all fields are required!" });
  }
  db_connect.collection("items").insertOne(itemObj, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "internal server error" });
    }
    console.log("Item added!");
    res.json(result);
  });
});

pageRoutes.route("/items/:id").delete(function (req, res) {
  try {
    let db_connect = db.getDb();
    let removeItemQuery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("items")
      .deleteOne(removeItemQuery, function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).send({ message: "internal server error" });
        }
        if (result.deletedCount === 0) {
          res.status(404).send({ message: "item not found" });
        }
        console.log("Item deleted!");
        res.json(result);
      });
  } catch (err) {
    console.error(err);
    res.status(400).send({ message: "select item to delete" });
  }
});

pageRoutes.route("/images").post(function (req, res) {
  let db_connect = db.getDb();
  let image = req.body.image;
  db_connect.collection("items").insertOne(image, function (err) {
    if (err) {
      console.error(err);
      res
        .status(500)
        .send({ error: "internal server error, process cannot be executed" });
    } else if (!req.body.image) {
      res.status(400).send({ message: "must have image to upload" });
    } else {
      res.send({ message: "upload successful" });
    }
  });
});

module.exports = pageRoutes;
