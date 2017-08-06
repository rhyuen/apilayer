"use strict";

const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const config = require("./config.js");
const routes = require("./routes.js");
const User = require("./models/user.js");
const userRoutes = require("./userroutes.js");
const apiRoutes = require("./apiroutes.js");
require("./logger.js");
require("./dbconn.js")();


app.set("PORT", process.env.PORT|| 5367);

app.use(cookieParser(config.cookieSecret, {
  httpOnly: true,
  maxAge: 3600
}));
app.use(compression({
  level: 5
}));
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public/views"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/", routes);
app.use("/user", userRoutes);
app.use("/api", apiRoutes);

app.get("/*", (req, res) => {
  res.redirect("/");
});

module.exports = app;
