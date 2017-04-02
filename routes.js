const express = require("express");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const config = require("./config.js");
let User = require("./models/user.js");
let router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to my initial route for the api.");
});

router.get("/login", (req, res) => {
  res.status(200).send("Welcome to my login route for the api.");
});

//Grant the Refresh token
//Write another route that grants Access Tokens.
router.post("/login", (req, res) => {
  let cleanUsername = validator.escape(req.body.username);
  let userPassword = req.body.password;
  User.findOne({name: cleanUsername}, (err, foundUser) => {
    if(err){
      return res.json({
        action: "LOGIN",
        message: "ERROR",
        description: err
      });
    }if(!foundUser){
      return res.json({
        action: "LOGIN",
        message: "Auth failed.",
        description: "User not found."
      });
    }else{
      if(!foundUser.validPassword(userPassword)){
        return res.json({
          action: "LOGIN",
          message: "Auth failed.",
          description: "Invalid password."
        });
      }else{
        const tokenOptions = {
          issuer: "API SERVER",
          expiresIn: "10h"
        };
        const tokenPayload = {
          username: foundUser.name,
          jti: "1234", //SOME UNIQUE NUMBER,
          iat: Math.floor(Date.now()/1000)
        };
        jwt.sign(tokenPayload, config[process.env.NODE_ENV].jwtsecret, tokenOptions, (err, token) => {
          if(err){
            return res.json({
              action: "LOGIN",
              message: "Auth failed.",
              description: "Token signing failed."
            });
          }
          res.cookie("apilayer_token", token, {
            expires: new Date(Date.now() + 36000),
            httpOnly: true
          });
          res.status(200).json({
            action: "LOGIN",
            message: "Authentication success",
            description: "Expires in an hour."
          });
        });
      }
    }
  });
});

router.post("/access", (req, res) => {
  //
});

router.get("/setup", (req, res) => {
  res.status(200).send("Welcome to my setup route for the api.");
});

router.post("/setup", (req, res) => {
  let cleanUsername = validator.escape(req.body.username);
  let userPassword = req.body.password;
  let latestUser = new User();
  latestUser.name = cleanUsername;
  latestUser.password = latestUser.generateHash(userPassword);
  latestUser.admin = false;

  latestUser.save((err, savedUser) => {
    if(err){
      if(err.code === 11000){
        console.log("Duplicate Key error.");
        console.log(latestUser);
      }
      console.log(err);
    }

    return res.status(200).json({
      message: "User Saved",
      time: new Date().toLocaleString(),
      username: savedUser.name
    });
  });
});

router.get("/documentation", (req, res) => {
  res.status(200).send("Welcome to my doc route for the api.");
});

router.get("/error", (req, res) => {
  res.status(200).send("Welcome to my error route for the api.");
});

router.get("/logout", (req, res) => {

});

module.exports = router;
