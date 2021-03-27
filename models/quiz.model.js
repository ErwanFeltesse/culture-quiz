const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    barId: {
      type: String,
      required: true,
    },
    quiz_name: {
      type: String,
      trim: true,
      maxlength: 150,
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
    quiz_date: {
      type: Date,
    },
    quiz_time:{
      type: String,
      required: true,
      maxlength: 10,
    },
    quiz_day: {
      type: String,
      required: true,
      maxlength: 10,
      trim: true,
    },
    picture: {
      type: String,
    },
    opinion: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    level:{
      type: String,
      required: true,
      maxlength: 10,
    },
  },
  {
    timestamps: true,
  }
);

const QuizModel = mongoose.model("quiz", quizSchema);
module.exports = QuizModel;
