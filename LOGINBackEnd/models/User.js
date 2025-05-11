// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  password: String,
  birthday: Date,
  gender: String,
  university: String,
  filiere: String
});

module.exports = mongoose.model("User", userSchema);

