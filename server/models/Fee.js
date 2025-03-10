const mongoose = require("mongoose");

const feeSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Student",
    },
    arrears: {
      type: Number,
      required: true,
      default: 0,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
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
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Staff",
        },
        desc: { type: String },
        amount: { type: Number },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    paymentList: [
      {
        receiptNumber: { type: String },
        receivedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Staff",
        },

        paidBy: { type: String },
        amount: { type: Number },
        phone: { type: String },
        email: { type: String },
        address: { type: String },
        paymentDate: { type: Date, default: Date.now },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// // Instance method to calculate total bills
// feeSchema.methods.calculateTotalBills = function() {
//   return this.bills.reduce((total, bill) => total + bill.amount, 0);
// };

// // Instance method to calculate total payments
// feeSchema.methods.calculateTotalPayments = function() {
//   return this.paymentList.reduce((total, payment) => total + payment.amount, 0);
// };

const Fee = mongoose.model("Fee", feeSchema);
module.exports = Fee;
