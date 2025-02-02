// const cloudinary = require("../utils/cloudinary");
const expressAsyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const Post = require("../models/postModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// const Token = require("../models/tokenModel");
const crypto = require("crypto");
const Class = require("../models/classModel");
const Student = require("../models/Student");
const Subject = require("../models/subject");
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

// delete Class
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

/**
 *  get subjects
 */
exports.getSubjects = expressAsyncHandler(async (req, res, next) => {
  const subjects = await Subject.find({}).populate(
    "subjectMaster",
    "firstName surname"
  );
  if (subjects) {
    res.status(200).json({
      success: true,
      subjects,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

/**
 *  Add subject
 */
exports.addSubject = expressAsyncHandler(async (req, res, next) => {
  const { subject, subjectMaster } = req.body;

  if (!subject) {
    res.status(400);
    throw new Error("Subject name is required");
  }

  let subjectExist = await Subject.findOne({ subject: subject });
  if (subjectExist) {
    res.status(400);
    throw new Error("Subject name already exist");
  }

  let result = await Subject.create({
    subject,
    subjectMaster,
  });
  if (result) {
    res.status(201).json({ success: true, result });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

/**
 *  Edit subject
 */
exports.editSubject = expressAsyncHandler(async (req, res, next) => {
  const { subject, subjectMaster } = req.body;
  if (!subject) {
    res.status(400);
    throw new Error("Subject name is required");
  }

  let subjectExist = await Subject.findOne({
    subject: req.body.subject,
    _id: { $ne: req.params.id },
  });

  if (subjectExist) {
    res.status(400);
    throw new Error("subject already exist");
  }

  let result = await Subject.findByIdAndUpdate(
    { _id: req.params.id },
    {
      subject,
      subjectMaster,
    }
  );

  if (result) {
    res.status(200).json({ success: true, result });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

//
exports.getStudentCounts = expressAsyncHandler(async (req, res, next) => {
  const studentCounts = await Student.aggregate([
    {
      $group: {
        _id: "$classId", // Group by classId
        studentCount: { $sum: 1 }, // Count the number of students in each class
      },
    },
    {
      $lookup: {
        from: "classes",
        localField: "_id",
        foreignField: "_id",
        as: "classInfo",
      },
    },
    { $unwind: "$classInfo" },
    {
      $project: {
        _id: 0,
        classId: "$_id",
        className: "$classInfo.className",
        studentCount: 1,
      },
    },
    {
      $facet: {
        classCounts: [
          // First facet for individual class counts
          { $project: { classId: 1, className: 1, studentCount: 1 } },
          { $sort: { className: 1 } }, // Sort by className in ascending order
        ],
        totalCount: [
          // Second facet for total student count
          {
            $group: {
              _id: null,
              totalStudents: { $sum: "$studentCount" },
            },
          },
          {
            $project: { _id: 0, totalStudents: 1 },
          },
        ],
      },
    },
  ]);

  if (studentCounts) {
    res.status(200).json({
      success: true,
      classCounts: studentCounts[0].classCounts,
      totalCount: studentCounts[0].totalCount[0]?.totalStudents || 0, // Handle case where no students exist
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});
