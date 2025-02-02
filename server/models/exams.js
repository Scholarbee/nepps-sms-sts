const mongoose = require("mongoose");

const examSchema = mongoose.Schema(
  {
    term: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    bills: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          // required: true,
          ref: "Student",
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Staff",
        },
        desc: { type: String },
        amount: { type: Number },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
