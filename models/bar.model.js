const mongoose = require("mongoose");

const barSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 90,
  },
  adress: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  category: {
    type: String,
    trim: true,
    maxlength: 90,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  picture: {
    type: String,
  },
  opinion: {
    type: String,
    trim: true,
    maxlength: 500,
  },
});
const BarModel = mongoose.model("bar", barSchema);
module.exports = BarModel;
