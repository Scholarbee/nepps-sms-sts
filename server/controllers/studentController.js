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
  // console.log(req.body);
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
  if (!classId) {
    res.status(400);
    throw new Error("Class is required");
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
  // console.log("working...");
  const {
    pid,
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

  const data = {
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

  const student = await Student.findByIdAndUpdate({ _id: req.params.id }, data);

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

// Get single Student
exports.getStudent = expressAsyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id).populate(
    "classId",
    "className"
  );

  if (student) {
    res.status(200).json({
      success: true,
      student,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
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
