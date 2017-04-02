const express = require("express");
const auth = require("./auth.js");
const Article = require("./models/article.js");
let router = express.Router();


// router.use(auth.isAuthorizedViaAuthHeader);

//Articles
//Author
//DATE RANGES

//RETURN NEWS ORGS
router.get("/news", (req, res) => {
  Article.find({}, (err, item) => {
    if(err)
      return res.json(err);
    res.json(item);
  });
});

router.get("/news/vsun", (req, res) => {
  Article.find({source: "Vancouver Sun"})
    .sort({"created_at.$date": -1})
    .limit(20)
    .exec((err, item) => {
      if(err)
        return res.json(err);
      res.json({
        src: "/api/news/vsun",
        count: item.length,
        status: "OK",
        timestamp: new Date().toLocaleString(),
        data: item
      });
  });
});

router.get("/news/province", (req, res) => {
  Article.find({source: "Province"})
    .sort({"created_at.$date": -1})
    .limit(20)
    .exec((err, item) => {
      if(err)
        return res.json(err);
      res.json({
        src: "/api/news/province",
        count: item.length,
        status: "OK",
        timestamp: new Date().toLocaleString(),
        data: item
      });
  });
});

router.get("/user", (req, res) => {
  res.json();
});


module.exports = router;
