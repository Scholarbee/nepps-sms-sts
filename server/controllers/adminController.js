// const cloudinary = require("../utils/cloudinary");
const expressAsyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
const crypto = require("crypto");
const Class = require("../models/CLass");
// const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Add staff
exports.addClass = expressAsyncHandler(async (req, res, next) => {
  if (!req.body.className) {
    res.status(400).json({ success: false, message: "Class name is required" });
    throw new Error("Class name is required");
  }
  let classExist = await Class.findOne({ className: req.body.className });
  if (classExist) {
    res.status(400).json({ success: false, message: "Class already exist" });
    throw new Error("Class already exist");
  }
  let result = await Class.create(req.body);
  if (result) {
    res.status(201).json({success:true, message:"Class created successfully.", result})
  } else {
    res
      .status(500)
      .json({
        success: false,
        message: "Something went wrong, please try again.",
      });
    throw new Error("Something went wrong, please try again.");
  }
});
// Add Class
exports.editClass = expressAsyncHandler(async (req, res, next) => {
  res.send("Class updated");
});
// Add Class
exports.deleteClass = expressAsyncHandler(async (req, res, next) => {
  res.send("Class deleted");
});
// Add Class

// Add Class
exports.getClass = expressAsyncHandler(async (req, res, next) => {
  res.send("Single Class");
});
// Add Class
exports.getClasses = expressAsyncHandler(async (req, res, next) => {
  res.send("All Class");
});
