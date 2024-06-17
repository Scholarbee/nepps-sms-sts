// const cloudinary = require("../utils/cloudinary");
const expressAsyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
const crypto = require("crypto");
const Class = require("../models/classModel");
// const Class = require("../models/CLass");
// const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Add class
exports.addClass = expressAsyncHandler(async (req, res, next) => {
  const {
    className,
    classRep,
    classHead,
    schoolFees,
    admissionFee,
    boardingFee,
  } = req.body;

  if (!className) {
    res.status(400);
    throw new Error("Class name is required");
  }

  let classExist = await Class.findOne({ className: req.body.className });
  if (classExist) {
    res.status(400);
    throw new Error("Class already exist");
  }

  let result = await Class.create({
    className,
    // classRep,
    // classHead,
    schoolFees: parseFloat(schoolFees).toFixed(2),
    admissionFee: parseFloat(admissionFee).toFixed(2),
    boardingFee: parseFloat(boardingFee).toFixed(2),
  });
  if (result) {
    res
      .status(201)
      .json({ success: true, message: "Class created successfully.", result });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

// Edit Class
exports.editClass = expressAsyncHandler(async (req, res, next) => {
  const {
    className,
    classRep,
    classHead,
    schoolFees,
    admissionFee,
    boardingFee,
  } = req.body;

  if (!className) {
    res.status(400);
    throw new Error("Class name is required");
  }

  let classExist = await Class.findOne({
    className: req.body.className,
    _id: { $ne: req.params.id },
  });
  if (classExist) {
    res.status(400);
    throw new Error("Class already exist");
  }

  let result = await Class.findByIdAndUpdate(
    { _id: req.params.id },
    {
      className,
      // classRep,
      // classHead,
      schoolFees: parseFloat(schoolFees).toFixed(2),
      admissionFee: parseFloat(admissionFee).toFixed(2),
      boardingFee: parseFloat(boardingFee).toFixed(2),
    }
  );

  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});
// Add Class
exports.deleteClass = expressAsyncHandler(async (req, res, next) => {
  res.send("Class deleted");
});

/**
 *  get Class
 */
exports.getClass = expressAsyncHandler(async (req, res, next) => {
  const id = req.params.id;
  // console.log(req.params);
  const data = await Class.findById({ _id: id });
  if (data) {
    res.status(200).json({ success: true, _class: data });
  } else {
    res.status(400);
    throw new Error("Class not found");
  }
});

// get Classes
exports.getClasses = expressAsyncHandler(async (req, res, next) => {
  const classes = await Class.find({});
  if (classes) {
    res.status(200).json({
      success: true,
      classes,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});
