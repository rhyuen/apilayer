const jwt = require("jsonwebtoken");
const express = require("express");
const config = require("./config.js");
const Auth = require("./auth.js");
const User = require("./models/user.js");
const router = express.Router();

router.use(Auth.isAuthorizedViaAuthHeader);

router.use((req, res, next) => {
  res.set({
    "Content-Type":"application/json; charset=utf-8",
    "Encoding": "utf8"
  });
  next();
});

router.get("/", (req, res) => {
  res.status(200).json({
    src: "/user",
    description: "User Profile Page"
  });
});


//GET EXISTING KEY
router.get("/key", (req, res) => {
  //Save Generated Key into DB?
  User.find({name: req.decoded.name}, (err, foundUser) => {
    if(err)
      return console.error(err);
    if(!foundUser.apiKey){
      return res.status(200).json({
        message: "Request a new key first"
      });
    }
    res.status(200).json({
      apikey: foundUser.apiKey
    });
  });
});

//GET NEW KEY for FIRST TIME
router.post("/key", (req, res) => {

  const tokenOptions = {
    issuer: "API SERVER",
    expiresIn: "720h"
  };

  const tokenPayload = {
    username: req.decoded.username,
    iat: Math.floor(Date.now()/1000)
  };

  //Save the Token to the DB. so USER can get it for future usage.
  jwt.sign(tokenPayload, config[process.env.NODE_ENV].apiKeySecret, tokenOptions, (err, token) => {
    if(err){
      return res.status(500).send({description: "ERROR: " + err});
    }else{
      User.update({name: req.decoded.name}, {$set: {apiKey: token}}, (err, userWithUpdatedKey) => {
        if(err){
          return console.error("Error things");
        }else{
          //userWithUpdatedKey doesn't seem to return anything.
          return res.status(200).json({
            description: "SUCCESS",
            apiKey: token,
          });
        }
      });
    }
  });
});

router.post("/close", (req, res) => {
  User.delete({username: "MyUsername"}, (err) => {
    if(err){
      console.error(err);
      res.json({
        src: "/user/close",
        message: "Error",
        description: "Failed to delete user."
      });
    }else{
      res.status(200).json({
        src: "/user/close",
        message: "Success.",
        description: "Account deleted."
      });
    }
  });
});

module.exports = router;
