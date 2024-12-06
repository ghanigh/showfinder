// models/UserProfile.js
const mongoose = require('mongoose');

const UserProfileSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: { type: Number },
  preferences: { type: String },
  biography: { type: String },
  gender: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
});

module.exports = mongoose.model('UserProfile', UserProfileSchema);
