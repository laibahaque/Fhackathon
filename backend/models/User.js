// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  dob: String, // or Date if you prefer (but keep as String if format flexibility is needed)
  gender: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String
}, { collection: 'users' });

module.exports = mongoose.model('User', userSchema);
