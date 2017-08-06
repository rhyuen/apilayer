"use strict";

const jwt = require("jsonwebtoken");
const winston = require("winston");
const config = require("./config.js");

exports.isAuthorizedViaAuthHeader = (req, res, next) => {
     const token = req.body.token || req.query.token || req.headers.authorization;
     if(token){
       jwt.verify(token, config[process.env.NODE_ENV].jwtsecret, (err, decoded) => {
         if(err)
           if(err.name === "TokenExpiredError"){
             winston.error("User login attempt with expired token.");
             return res.json({
               success: false,
               message: err.message,
               expiredAt: err.expiredAt
             });
           }else{
             winston.error("User login attempt with invalid signature.");
             return res.json({
               success: false,
               message: "User Login via Query/AuthHeader/Token Failed",
               suggestions: "Incorrect signing key used?"
             });
           }
         else{
           req.decoded = decoded;
           req.body.token = token;
           next();
         }
       });
     }else{
       winston.error("No Token in Auth Header during login to user account.");
       return res.status(403).json({
         success:false,
         message: "User auth failed. No token provided.  Go to the login page and enter your credentials."
       });
     }
 };


exports.isValidAPIKey = (req, res, next) => {
  const token = req.headers.authorization || req.query.token;
  if(token){
    jwt.verify(token, config[process.env.NODE_ENV].apiKeySecret, (err, decoded) => {
      if(err){
        if(err.name === "TokenExpiredError"){
          winston.error("User attempted to use the API with an expired key.");
          return res.json({
            success: false,
            message: err.message,
            expiredAt: err.expiredAt
          });
        }else{
          winston.error("User attempted to use the API with an invalid key.");
          return res.json({
            success: false,
            message: "API Auth via AuthHeader/Query for API Failed.",
            description: "Invalid token was presented.",
            suggestions: "Incorrect Signing key used."
          });
        }
      }else{
        req.decoded = decoded;
        next();
      }
    });
  }else{
    winston.error("User with invalid API Key or No Api key trying to access protected resources.");
    return res.status(403).json({
      success: false,
      message: "Need a valid API Key to access protected resources. Get an API key by making an account."
    });
  }
};


exports.isValidCookieAuth = (req, res, next) => {

};
