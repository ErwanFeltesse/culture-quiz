const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    category:{
        type: String,
        trim: true,
        maxlength: 90,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    quizz_date:{
        type: Date,
        required: true,
    },
    picture: {
      type: String,
    },
},
{
    timestamps: true,
  }
);

 const QuizModel = mongoose.model("quiz", quizSchema);
 module.exports = QuizModel
