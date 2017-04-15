"use strict";

const jwt = require("jsonwebtoken");
const config = require("./config.js");


 exports.isAuthorizedViaAuthHeader = (req, res, next) => {
     const token = req.body.token || req.query.token ||req.headers["x-access-token"] || req.headers["Authorization"];
     if(token){
       jwt.verify(token, config[process.env.NODE_ENV].jwtsecret, (err, decoded) => {
         if(err)
           if(err.name === "TokenExpiredError"){
             return res.json({success: false, message: err.message, expiredAt: err.expiredAt});
           }else{
             return res.json({success: false, message: "Token Auth Failed"});
           }
         else{
           req.decoded = decoded;
           req.body.token = token;
           next();
         }
       });
     }else{
       return res.status(403).json({
         success:false,
         message: "User auth failed. No token provided.  Go to the login page and enter your credentials."
       });
     }
 };


exports.isValidAPIKey = (req, res, next) => {
  const token = req.headers["Authorization"] || req.body.token ;
  if(token){
    jwt.verify(token, config[process.env.NODE_ENV].apiKeySecret, (err, decoded) => {
      if(err)
        if(err.name === "TokenExpiredError"){
          return res.json({success: false, message: err.message, expiredAt: err.expiredAt});
        }else{
          return res.json({success: false, message: "Token Auth Failed"});
        }
      else{
        req.decoded = decoded;
        next();
      }
    });
  }else{
    return res.status(403).json({
      success: false,
      message: "Need a valid API Key to access protected resources. Get an API key by making an account."
    });
  }
};
