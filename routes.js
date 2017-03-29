const express = require("express");
let router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Welcome to my initial route for the api.");
});

router.get("/login", (req, res) => {
  res.status(200).send("Welcome to my login route for the api.");
});

router.post("/login", (req, res) => {
  res.status(200).send("Welcome to my login(POST) route for the api.");
});

router.get("/setup", (req, res) => {
  res.status(200).send("Welcome to my setup route for the api.");
});

router.post("/setup", (req, res) => {
  res.status(200).send("Welcome to my setup(POST) route for the api.");
});

router.get("/documentation", (req, res) => {
  res.status(200).send("Welcome to my doc route for the api.");
});

router.get("/error", (req, res) => {
  res.status(200).send("Welcome to my error route for the api.");
});

module.exports = router;
