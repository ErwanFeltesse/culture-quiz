const BarModel = require("../models/bar.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readBar = (req, res) => {
  BarModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

module.exports.createBar = async (req, res) => {
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
    fileName = req.body.name + "avatar" + Date.now() + ".jpg";
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/bars/${fileName}`
      )
    );
  }
  const newBar = new BarModel({
    name: req.body.name,
    adress: req.body.adress,
    description: req.body.description,
    category: req.body.category,
    picture: req.file !== null ? "./uploads/bars/" + fileName : "",
    opinion: req.body.opinion,
  });

  try {
    const bar = await newBar.save();
    return res.status(201).json(bar);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports.updateBar = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    name: req.body.name,
    adress: req.body.adress,
    description: req.body.description,
    category: req.body.category,
    opinion: req.body.opinion,
  };

  BarModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error: " + err);
    }
  );
};

module.exports.deleteBar = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  BarModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("delete error : " + err);
  });
};
