const express = require("express");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const config = require("./config.js");
let User = require("./models/user.js");
const winston = require("winston");
let router = express.Router();

router.get("/", (req, res) => {
  const welcome = "Routes: / ||  /login ||  /access ||  /setup || /documentation || /error || /logout";  
  res.status(200).send(welcome);
});

router.get("/login", (req, res) => {
  res.status(200).send(welcome);
});

//Grant the Refresh token / ID_TOKEN
router.post("/login", (req, res) => {
  res.set({
    "Content-Type":"application/json",
    "Encoding": "utf8"
  });
  let cleanUsername = validator.escape(req.body.username);
  let userPassword = req.body.password;
  User.findOne({name: cleanUsername}, (err, foundUser) => {
    if(err){
      winston.error("Issue occurred with user login.");
      return res.json({
        action: "LOGIN",
        message: "ERROR",
        description: err
      });
    }if(!foundUser){
      winston.error("Attempted login, user not found.");
      return res.json({
        action: "LOGIN",
        message: "Auth failed.",
        description: "User not found."
      });
    }else{      
      if(!foundUser.validPassword(userPassword)){
        winston.info("Attempted login with invalid password.");
        return res.json({
          action: "LOGIN",
          message: "Auth failed.",
          description: "Invalid password."
        });
      }else{
        const tokenOptions = {
          issuer: "AUTH SERVER",
          expiresIn: "10h"
        };
        const tokenPayload = {
          username: foundUser.name,
          jti: Math.floor(Math.random()*1000).toString(), //SOME UNIQUE NUMBER,
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
            description: "Expires in an hour.",
            token: token
          });
        });
      }
    }
  });
});

//Grant the Access Token, after having been granted the Refresh Token.
router.post("/access", (req, res) => {

});

router.get("/setup", (req, res) => {
  res.status(200).send("Welcome to my setup route for the api.");
});

router.post("/setup", (req, res) => {
  res.set({
    "Content-Type":"application/json",
    "Encoding": "utf8"
  });
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
      message: `User Saved: ${savedUser.name}`,
      time: new Date().toLocaleString(),
      username: savedUser.name
    });
  });
});

router.get("/documentation", (req, res) => {
  res.status(200).send("Welcome to my doc route for the api.");
});

router.get("/error", (req, res) => {
  res.status(200).json({
    status: "ERROR PAGE",
    message: "There was an error."
  });
});

router.get("/logout", (req, res) => {
  res.cookie("id_token", "LOGGEDOUT", {
      expires: new Date(Date.now() - 36000),
      httpOnly: true
    });
  res.redirect("/");
});

module.exports = router;
