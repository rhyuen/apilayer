const express = require("express");
const auth = require("./auth.js");
let router = express.Router();


router.use(auth.isAuthorizedViaAuthHeader);

router.get("/", (req, res) => {
  res.json();
});

router.get("/", (req, res) => {
  res.json();
});


module.exports = router;
