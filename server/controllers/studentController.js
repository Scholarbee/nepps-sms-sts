// const cloudinary = require("../utils/cloudinary");
const expressAsyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
const crypto = require("crypto");
const { studentIdGenerator } = require("../utils/studentIdGenerator");
const Student = require("../models/Student");
// const Class = require("../models/Class");
const Fee = require("../models/Fee");
const Class = require("../models/classModel");
// const sendEmail = require("../utils/sendEmail");

/**
 * This is a function/method that handles the logics to add new student
 */
exports.addStudent = expressAsyncHandler(async (req, res, next) => {
  const { name, gender, town, phone, classId } = req.body;

  // Validation of fields
  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }
  if (!phone) {
    res.status(400);
    throw new Error("Phone is required");
  }
  if (!gender) {
    res.status(400);
    throw new Error("Gender is required");
  }
  if (!town) {
    res.status(400);
    throw new Error("Town is required");
  }
  if (!classId) {
    res.status(400);
    throw new Error("Class is required");
  }

  // Generating unique Student ID
  let studentId = await studentIdGenerator();
  const student = await Student.create({
    name,
    phone,
    town,
    classId,
    gender,
    user: { id: studentId, password: studentId },
  });

  //
  const c = await Class.findById(classId);

  let fees = 0;
  if (student.residency == "Day") {
    fees = c.fees.day;
  } else {
    fees = c.fees.boarder;
  }

  //
  const fee = await Fee.create({
    studentId: student._id,
    term: "1",
    year: "2024",
    bills: { desc: "School Fees", amount: fees },
  });

  if (!student || !fee) {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }

  if (student) {
    res.status(201).json({
      success: true,
      student,
      message: "Student admitted successfully",
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

/**
 *
 * This is a function/method that handles the logics to update student information
 */
exports.editStudent = expressAsyncHandler(async (req, res, next) => {
  const { name, gender, town, phone, classId, residency } = req.body;

  // Validation of fields
  if (!name) {
    res.status(400);
    throw new Error("Name is required");
  }
  if (!phone) {
    res.status(400);
    throw new Error("Phone is required");
  }
  if (!gender) {
    res.status(400);
    throw new Error("Gender is required");
  }
  if (!town) {
    res.status(400);
    throw new Error("Town is required");
  }
  if (!classId) {
    res.status(400);
    throw new Error("Class is required");
  }
  if (!residency) {
    res.status(400);
    throw new Error("Residency is required");
  }

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name,
      phone,
      town,
      classId,
      gender,
      residency,
    },
    { new: true }
  );

  if (student) {
    res.status(201).json({
      success: true,
      student,
      message: "Student admitted successfully",
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }

  res.send("Student updated");
});
// Add Student
exports.deleteStudent = expressAsyncHandler(async (req, res, next) => {
  res.send("Student deleted");
});
// Add Student
exports.suspendStudent = expressAsyncHandler(async (req, res, next) => {
  res.send("Student suspended");
});
// Add Student
exports.activateStudent = expressAsyncHandler(async (req, res, next) => {
  res.send("Student activated");
});
// Add Student
exports.archiveStudent = expressAsyncHandler(async (req, res, next) => {
  res.send("Student archived");
});
// Add Student
exports.getStudent = expressAsyncHandler(async (req, res, next) => {
  res.send("Single Student");
});
// Add Student
exports.getStudents = expressAsyncHandler(async (req, res, next) => {
  res.send("All Student");
});
