const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: String,
  url: String,
  source: String
},  {timestamps: {
  createdAt: "created_at"
}});

module.exports = mongoose.model("Article", articleSchema);
