const AdminModel = require("../models/admin.model");

module.exports.signUp = async (req, res) => {
const {pseudo, email, password} = req.body

try{
    const admin = await AdminModel.create({pseudo, email, password});
    res.status(201).json({admin: admin._id})
}
catch(err) {
    res.status(200).send({err})
}
};
