// dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser")
const sanitizeHtml = require("sanitize-html");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { passport } = require("../auth");
const session = require("express-session");
require("dotenv").config({ path: "./config.env" });
// router middleware
const pageRoutes = express.Router();
// database connection
const db = require("../db/connection");
// convert string to object
const ObjectId = require("mongodb").ObjectId;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());


pageRoutes.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

pageRoutes.use(passport.initialize());
pageRoutes.use(passport.session());

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user authenticated")
    return next();
  } else {
    console.log("authentication failed")
  }
  res.status(401).json({ message: "Unauthorized" });
};

// user sign up that redirects to the seller page
pageRoutes.route("/seller/sign-up").post(async (req, res) => {
  try {
  let db_connect = db.getDb();
  const { fullName, username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 13);
    
    const existingUser = await db_connect.collection("users").findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      console.error("Username or email already exists.");
      return res.status(400).json({ error: "Username or email already exists" });
    }
    
    const userId = new ObjectId();

    const result = await db_connect.collection("users").insertOne({
      _id: userId,
      fullName: fullName,
      username: username,
      email: email,
      password: hash,
      blocked: false,
    });
    if (result.acknowledged && result.insertedId) {
      res.status(200).json({ message: "Sign Up Successful" });
    } else {
      console.error("Failed to insert user. No documents inserted.");
      res.status(500).json({ error: "Failed to insert user" });
    }
  } catch (err) {
    console.error("Failed to insert user:", err);
    res.status(500).json({ error: `Failed to insert user: Error: ${err.message}` });
  }
});

pageRoutes.route("/user/sign-in").post(
  (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(400).send({ message: "Username or password is incorrect" });
    } else {
      next();
    }
  },
  (req, res, next) => {
    req.body.username = sanitizeHtml(req.body.username);
    req.body.password = sanitizeHtml(req.body.password);
    next();
  },
  (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ message: "Internal server error" });
      }

      if (!user) {
        return res.status(401).send({ message: "Authentication failed" });
      }
      // Manually log in the user
      req.logIn(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return res.status(500).send({ message: "Internal server error" });
        }
        const sessionData = {
          _id: user._id,
          username: user.username,
          fullName: user.fullName,
        }
        
        req.session.username = sessionData;
        res.cookie("users", req.session.username, {
          httpOnly: true,
          maxAge: 3600000,
          path: "/seller",
          sameSite: "None",
          secure: true,
        });
        res.status(200).send({
          message: "Successful login!",
          users: {
            _id: req.user._id,
            username: req.user.username,
            fullName: req.user.fullName,
          }
        });
        req.session.userId = user._id
        
      });
    })(req, res, next); 
  }
);


// routes for users with queries to database
pageRoutes.route("/user/find").get(function (req, res) {
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
pageRoutes.route("/reviews/items").get(function (req, res) {
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
    .collection("/reviews")
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
pageRoutes.route("/market/items").get(function (req, res) {
  let db_connect = db.getDb();

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

// this is the route for the search function
pageRoutes.route("/market/search").get(function(req, res) {
  let db_connect = db.getDb();
  let searchParams = req.query;
  let searchCriteria = {};

  if (searchParams.term) {
    searchCriteria.$or = [
      { sellerName: { $regex: searchParams.term, $options: "i" } }, 
      { product: { $regex: searchParams.term, $options: "i" } } 
    ];
  }
  db_connect.collection("items").find(searchCriteria).toArray(function (err, result) {
    if (err) {
      console.error(err)
      res.status(500).send({message: "internal server error"})
    }
    res.json(result)
  })
})

// this is for the seller page, to show items the user has sold
pageRoutes.route("/market/items/sold/").get(function (req, res) {
  let db_connect = db.getDb();
  let itemQuery = { itemSold: true };
  db_connect.collection("items").find(itemQuery).toArray(function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send({ message: "Internal server error" });
      return;
    }
    res.json(result);
  });
});

// this is the route to show the items the user is selling
pageRoutes.route("/market/items/selling").get(async (req, res) => {
  let db_connect = db.getDb();
  console.log("Session contents", req.session)
  let userId = req.session.userId
  console.log("user in session", userId)
  let itemQuery = { 
    itemSold: false,
  };
  
  console.log("item query", itemQuery)
  
  try {
    db_connect.collection("items").find(itemQuery).toArray((err, result) => {
      if (err) {
        console.error("Error fetching selling items:", err);
        return res.status(500).json({ message: "Internal server error, route has nothing in it or user is not valid" });
      }
      // console.log(result)
      res.json(result);
    });
  } catch (error) {
    console.error("Error in fetching selling items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// this is the route for when a user needs to edit some information
pageRoutes.route("market/items/update/:id").put(function (req, res) {
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

// this is the route for adding an item to the market place
pageRoutes.route("/market/items/add").post(function (req, res) {
  let db_connect = db.getDb();
  let userId = new ObjectId();
  let itemObj = {
    sellerId: userId,
    sellerName: req.body.sellerName,
    product: req.body.product,
    price: req.body.price,
    description: req.body.description,
    itemSold: false,
  };

  if (
    !req.body.sellerName ||
    !req.body.product ||
    !req.body.price ||
    !req.body.description
  ) {
    return res.status(400).send({ message: "All fields are required!" });
  }

  db_connect.collection("items").insertOne(itemObj, function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    }
    console.log("Item added!");
    res.json(result);
  });
});


// this is the the route for the user to edit information about an item
pageRoutes.route("/market/items/:id").delete(function (req, res) {
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



module.exports = pageRoutes;
