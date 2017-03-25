const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({
  name: String,
  password: String,
  admin: Boolean
}, {
  timestamps: {
    createdAt: "created_at"
  }
});

userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
