const AdminModel = require("../models/admin.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllAdmins = async (req, res) => {
  const admins = await AdminModel.find().select("-password"); //select all except password
  res.status(200).json(admins);
};
module.exports.adminInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    AdminModel.findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("ID unknown : " + err);
    }).select("-password");
  };

  module.exports.updateAdmin= async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
      await AdminModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            bio: req.body.bio,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
          if (!err) return res.send(docs);
          if (err) return res.status(500).send({ message: err });
        }
      );
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };

  module.exports.deleteAdmin = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
    try {
      await AdminModel.deleteOne({ _id: req.params.id }).exec();
      res.status(200).json({ message: "Admin successfully deleted " });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  };