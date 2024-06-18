const cloudinary = require("../utils/cloudinary");
const expressAsyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
const crypto = require("crypto");
const Staff = require("../models/Staff");
const { staffIdGenerator } = require("../utils/staffIdGenerator");
// const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Add staff
exports.addStaff = expressAsyncHandler(async (req, res, next) => {
  const {
    firstName,
    surname,
    otherName,
    gender,
    birthDate,
    religion,
    phone,
    address,
    email,
  } = req.body;

  // Validation of fields
  if (!firstName || !surname) {
    res.status(400);
    throw new Error("First name and surname are required");
  }
  if (!phone) {
    res.status(400);
    throw new Error("Phone is required");
  }
  if (!gender) {
    res.status(400);
    throw new Error("Gender is required");
  }
  if (!address) {
    res.status(400);
    throw new Error("Town is required");
  }
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  if (!req.file) {
    res.status(400);
    throw new Error("Image is required");
  }

  // upload image in cloudinary
  const result = await cloudinary.handleFileFormatAndUpload(req);
  if (!result) {
    res.status(400);
    throw new Error(
      "Something went wrong whiles saving image. Please try again"
    );
  }

  // Generating unique staff ID
  let staffId = await staffIdGenerator();
  const staff = await Staff.create({
    firstName,
    surname,
    otherName,
    gender,
    birthDate,
    religion,
    phone,
    address,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    user: { id: staffId, email: email, password: staffId },
  });

  if (staff) {
    res.status(201).json({
      success: true,
      staff,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

// Edit staff
exports.editStaff = expressAsyncHandler(async (req, res, next) => {
  const {
    pid,
    firstName,
    surname,
    otherName,
    gender,
    birthDate,
    religion,
    phone,
    email,
    address,
  } = req.body;

  const data = {
    firstName,
    surname,
    otherName,
    gender,
    birthDate,
    religion,
    phone,
    email,
    address,
  };

  // Validation of fields
  if (req.file) {
    const result = await cloudinary.handleFileFormatAndUpload(req);
    if (!result) {
      res.status(400);
      throw new Error(
        "Something went wrong whiles saving image. Please try again"
      );
    }
    data.image = {
      public_id: result.public_id,
      url: result.secure_url,
    };
    const response = await cloudinary.deleteOldImage(pid);
  }

  // console.log(data);

  const staff = await Staff.findByIdAndUpdate({ _id: req.params.id }, data);

  if (staff) {
    res.status(200).json({
      success: true,
      staff,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

// Delete staff
exports.deleteStaff = expressAsyncHandler(async (req, res, next) => {
  const studentDeleted = await Staff.findByIdAndDelete(req.params.id);
  // console.log(staffDeleted);
  if (staffDeleted) {
    if (staffDeleted.image.public_id) {
      const imgDeleted = await cloudinary.deleteOldImage(
        staffDeleted.image.public_id
      );
    }
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

// suspended staff
exports.suspendStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Staff suspended");
});

// activated Student
exports.activateStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Staff activated");
});

// Archive staff
exports.archiveStaff = expressAsyncHandler(async (req, res, next) => {
  res.send("Staff archived");
});

// Get staff
exports.getStaff = expressAsyncHandler(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id);

  if (staff) {
    res.status(200).json({
      success: true,
      staff,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

/**
 * Get all staffs
 */
exports.getStaffs = expressAsyncHandler(async (req, res, next) => {
  const staffs = await Staff.find({}).sort("-createdAt");
  // const staffs = await Staff.find({}, "-user.password");

  if (staffs) {
    res.status(200).json({
      success: true,
      staffs,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});
