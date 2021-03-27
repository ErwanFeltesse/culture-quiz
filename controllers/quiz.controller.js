const QuizModel = require("../models/quiz.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readQuiz = (req, res) => {
  QuizModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.createQuiz = async (req, res) => {
  let fileName;
    if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType !== "image/jpg" &&
        req.file.detectedMimeType !== "image/png" &&
        req.file.detectedMimeType !== "image/jpeg"
      )
        throw Error("invalid file");
      if (req.file.size > 500000) throw Error("max size reached");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(200).json({ errors });
    }
    fileName = req.body.barId + Date.now() + ".jpg";
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/quizs/${fileName}`
      )
    );
  }
  const newQuiz = new QuizModel({
    barId: req.body.barId,
    quiz_name: req.body.quiz_name,
    description: req.body.description,
    category: req.body.category,
    picture: req.file !== null ? "./uploads/quizs/" + fileName : "",
    quiz_date: req.body.quiz_date,
    quiz_time: req.body.quiz_time,
    quiz_day: req.body.quiz_day,
  });

  try {
    const quiz = await newQuiz.save();
    return res.status(201).json(quiz);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.updateQuiz = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    quiz_name: req.body.quiz_name,
    description: req.body.description,
    category: req.body.category,
    quiz_date: req.body.quiz_date,
    quiz_time: req.body.quiz_time,
    quiz_day: req.body.quiz_day,
  };
  QuizModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error: " + err);
    }
  );
};

module.exports.deleteQuiz = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  QuizModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("delete error : " + err);
  });
};
