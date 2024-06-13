// const cloudinary = require("../utils/cloudinary");
const expressAsyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
const crypto = require("crypto");
const Staff = require("../models/Staff");
// const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Add staff
exports.addStaff = expressAsyncHandler(async (req, res, next) => {
  const { name, gender, town, email, password, phone } = req.body;
  const staff = await Staff.create({
    name,
    gender,
    town,
    phone,
    user: { email },
  });
  res.status(200).json({ success: true, message: "Staff added", staff });
});
// Add staff
exports.editStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Staff updated");
});
// Add staff
exports.deleteStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Staff deleted");
});
// Add staff
exports.suspendStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Staff suspended");
});
// Add Student
exports.activateStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Staff activated");
});
// Add staff
exports.archiveStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Staff archived");
});
// Add staff
exports.getStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Single staff");
});
// Add staff
exports.getStaffs = expressAsyncHandler(async (req, res, next) => {
  res.send("All staff");
});
