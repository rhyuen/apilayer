const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to my initial route for the api.");
});

router.get("/login", (req, res) => {

});

router.post("/login", (req, res) => {

});

router.get("/documentation", (req, res) => {

});

router.get("/error", (req, res) => {

});

router.get("/*", (req, res) => {

});

module.exports = router;
