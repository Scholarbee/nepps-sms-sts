const mongoose = require("mongoose");

const subjectSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    subjectMaster: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Staff",
    },
  },
  {
    timestamps: true,
  }
);

const Subject = mongoose.model("Subject", subjectSchema);
module.exports = Subject;
