const AdminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password } = req.body;

  try {
    const admin = await AdminModel.create({ pseudo, email, password });
    res.status(201).json({ admin: admin._id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

// authentification avec jws

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await AdminModel.login(email, password);
    const token = createToken(admin._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge });
    res.status(200).send({ admin: admin._id });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
