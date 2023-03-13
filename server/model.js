const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  uid: String,
  created: {
    type: Date,
    default: Date.now,
  },
  modified: {
    type: Date,
    default: Date.now,
  },
  address: String,
  cid: String,
});

module.exports = {
  userSchema: new mongoose.model("user", userSchema, "users-cid"),
};
