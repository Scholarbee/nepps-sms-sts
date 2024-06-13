const mongoose = require("mongoose");

const classSchema = mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
    },
    fees: {
      day: {
        type: Number,
        required: true,
        default: 500,
      },
      boarder: {
        type: Number,
        required: true,
        default: 900,
      },
    },
    // boardingBills: [
    //   {
    //     createdBy: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Staff",
    //     },
    //     desc: { type: String },
    //     amount: { type: Number },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],
    // dayBills: [
    //   {
    //     createdBy: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Staff",
    //     },
    //     desc: { type: String },
    //     amount: { type: Number },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],
    // generalBills: [
    //   {
    //     createdBy: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Staff",
    //     },
    //     desc: { type: String },
    //     amount: { type: Number },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // ],
    classRep: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Student",
    },
    classMaster: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Staff",
    },
  },
  {
    timestamps: true,
  }
);

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
