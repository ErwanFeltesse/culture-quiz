const mongoose = require("mongoose");
const { isEmail } = require("validator");

const adminSchema = new mongoose.Schema({
  pseudo: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 55,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    minLength: 6,
  },
  picture: {
      type: String,
      default:""
  },
  bio: {
    type: String,
    max: 1024,
  },
});

const AdminModel = mongoose.model('admin', adminSchema)
module.exports = AdminModel