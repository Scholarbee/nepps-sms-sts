const cloudinary = require("../utils/cloudinary");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { studentIdGenerator } = require("../utils/studentIdGenerator");
const Student = require("../models/Student");
const Fee = require("../models/Fee");
const Class = require("../models/classModel");

/**
 * This is a function/method that handles the logics to add new student
 */
exports.addStudent = expressAsyncHandler(async (req, res, next) => {
  console.log(req.body);
  const {
    firstName,
    surname,
    otherName,
    gender,
    birthDate,
    religion,
    nhis,
    classId,
    residency,
    phone,
    address,
    motherName,
    motherAddress,
    motherPhone,
    motherOccupation,
    fatherName,
    fatherAddress,
    fatherPhone,
    fatherOccupation,
    emergencyContactName,
    emergencyContactAddress,
    emergencyContactPhone,
    emergencyContactOccupation,
  } = req.body;

  // Validation of fields
  // if (!firstName || !surname) {
  //   res.status(400);
  //   throw new Error("First name and surname are required");
  // }
  // if (!phone) {
  //   res.status(400);
  //   throw new Error("Phone is required");
  // }
  // if (!gender) {
  //   res.status(400);
  //   throw new Error("Gender is required");
  // }
  // if (!town) {
  //   res.status(400);
  //   throw new Error("Town is required");
  // }
  // if (!classId) {
  //   res.status(400);
  //   throw new Error("Class is required");
  // }

  // upload image in cloudinary
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const result = await cloudinary.handleUpload(dataURI);

  if (!result) {
    res.status(400);
    throw new Error(
      "Something went wrong whiles saving image. Please try again"
    );
  }

  // Generating unique Student ID
  let studentId = await studentIdGenerator();
  const student = await Student.create({
    firstName,
    surname,
    otherName,
    gender,
    birthDate,
    religion,
    nhis,
    classId,
    residency,
    phone,
    address,
    image: {
      public_id: result.public_id,
      url: result.secure_url,
    },
    motherName,
    motherAddress,
    motherPhone,
    motherOccupation,
    fatherName,
    fatherAddress,
    fatherPhone,
    fatherOccupation,
    emergencyContactName,
    emergencyContactAddress,
    emergencyContactPhone,
    emergencyContactOccupation,
    user: { id: studentId, password: studentId },
  });

  //
  // const c = await Class.findById(classId);

  // let fees = 0;
  // if (student.residency == "Day") {
  //   fees = c.fees.day;
  // } else {
  //   fees = c.fees.boarder;
  // }

  //
  // const fee = await Fee.create({
  //   studentId: student._id,
  //   term: "1",
  //   year: "2024",
  //   bills: { desc: "School Fees", amount: fees },
  // });

  // 

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

// Get all students
exports.getStudents = expressAsyncHandler(async (req, res, next) => {
  const students = await Student.find({})
    .populate("classId", "className")
    .sort("-createdAt");
  if (students) {
    res.status(200).json({
      success: true,
      students,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});
