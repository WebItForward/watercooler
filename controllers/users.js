const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  indexUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};

async function indexUsers(req, res) {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json(error);
  }
}

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    const token = createJWT(user);
    res.json(token);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json(error);
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json(error);
  }
}

async function updateUser(req, res) {
  try {
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json(error);
  }
}

async function deleteUser(req, res) {
  try {
  } catch (error) {
    console.log("Error: ", error);
    res.status(400).json(error);
  }
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: "24h" });
}
