const expressAsyncHandler = require("express-async-handler");
const Fee = require("../models/Fee");
const Student = require("../models/Student");
const { receiptNumberGenerator } = require("../utils/receiptNumberGenerator");

/**
 *
 */
exports.GetFeeDetails = expressAsyncHandler(async (req, res, next) => {
  const feeDetails = await Student.aggregate([
    {
      $lookup: {
        from: "fees",
        let: { studentId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$studentId", "$$studentId"] },
              isActive: true, // Filter active fees
            },
          },
          {
            $project: {
              term: 1,
              year: 1,
              arrears: 1,
              balance: 1,
              totalBills: { $sum: "$bills.amount" },
              totalPaid: { $sum: "$paymentList.amount" },
            },
          },
        ],
        as: "feeDetails",
      },
    },
    { $unwind: { path: "$feeDetails", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "classInfo",
      },
    },
    { $unwind: { path: "$classInfo", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        studentId: "$user.id",
        name: {
          $concat: [
            "$firstName",
            " ",
            { $ifNull: ["$otherName", ""] },
            " ",
            "$surname",
          ],
        },
        image: "$image.url",
        className: "$classInfo.className",
        term: "$feeDetails.term",
        year: "$feeDetails.year",
        arrears: "$feeDetails.arrears",
        balance: "$feeDetails.balance",
        totalPaid: "$feeDetails.totalPaid",
        currentFees: "$feeDetails.totalBills",
        amountOwing: {
          $subtract: [
            {
              $subtract: [
                { $add: ["$feeDetails.totalBills", "$feeDetails.arrears"] },
                "$feeDetails.balance",
              ],
            },
            "$feeDetails.totalPaid",
          ],
        },
        amountToBePaid: {
          $subtract: [
            { $add: ["$feeDetails.totalBills", "$feeDetails.arrears"] },
            "$feeDetails.balance",
          ],
        },
        paymentList: "$feeDetails.paymentList",
        createdAt: "$createdAt",
      },
    },
  ]);

  if (feeDetails) {
    res.status(200).json({
      success: true,
      feeDetails,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

/**
 *
 */
exports.getCurrentBill = expressAsyncHandler(async (req, res, next) => {
  const currentBill = await Fee.findOne({
    studentId: req.params.id,
    isActive: true,
  })
    .populate("studentId")
    .populate("paymentList.receivedBy", "firstName surname otherName")
    .populate({
      path: "studentId",
      populate: {
        path: "classId",
        model: "Class", // Assuming Class is your Mongoose model
      },
    });
  if (currentBill) {
    res.status(200).json({
      success: true,
      currentBill,
    });
  } else {
    res.status(500);
    throw new Error("Something went wrong, please try again.");
  }
});

/**
 * Add new payment
 */
exports.addPayment = expressAsyncHandler(async (req, res, next) => {
  const { email, address, amount, paidBy, paymentDate, phone } = req.body;
  console.log(req.user);

  const fee = await Fee.findOneAndUpdate(
    { studentId: req.params.id },
    {
      $push: {
        paymentList: {
          email,
          address,
          amount,
          paidBy,
          receivedBy: req.user._id,
          paymentDate,
          phone,
          receiptNumber: await receiptNumberGenerator(),
        },
      },
    },
    { new: true }
  );

  if (fee) {
    res.status(200).json({
      success: true,
      fee,
    });
  } else {
    res.status(500);
    throw new Error("Error");
  }
});

/**
 * Add bill
 */
exports.addBill = expressAsyncHandler(async (req, res, next) => {
  const { desc, amount } = req.body;
  if (!desc || !amount) {
    res.status(404);
    throw new Error("All fields are required.");
  }
  const fee = await Fee.findOneAndUpdate(
    { studentId: req.params.id, isActive: true },
    {
      $push: {
        bills: { desc, amount },
      },
    },
    { new: true }
  );

  if (fee) {
    res.status(200).json({
      success: true,
      fee,
    });
  } else {
    res.status(500);
    throw new Error("Error");
  }
});

/**
 * Remove bill
 */
exports.removeBill = expressAsyncHandler(async (req, res, next) => {
  const { feeId, billId } = req.params;

  // Find the Fee document and pull the specific bill
  const fee = await Fee.findByIdAndUpdate(
    feeId,
    { $pull: { bills: { _id: billId } } },
    { new: true }
  );

  if (fee) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(500);
    throw new Error("Error");
  }
});

/**
 * Update bill
 */
exports.editBill = expressAsyncHandler(async (req, res, next) => {
  const { feeId, billId } = req.params;
  const { desc, amount } = req.body;

  // Find the Fee document and update the specific bill
  const fee = await Fee.findOneAndUpdate(
    { _id: feeId, "bills._id": billId },
    { $set: { "bills.$.desc": desc, "bills.$.amount": amount } },
    { new: true }
  );

  if (fee) {
    res.status(200).json({
      success: true,
    });
  } else {
    res.status(500);
    throw new Error("Error");
  }
});

/**
 * Get a given payment by Id
 */
exports.paymentDetails = expressAsyncHandler(async (req, res, next) => {
  const { paymentId } = req.params;

  const paymentDetails = await Fee.findOne({ "paymentList._id": paymentId })
    .populate({
      path: "studentId",
      select: "firstName surname user.id otherName classId", // Fields from Student to select
      populate: {
        path: "classId",
        select: "className", // Field from Class to select
      },
    })
    .populate("paymentList.receivedBy", "firstName surname otherName user.id")
    .select("studentId term year paymentList.$");

  if (paymentDetails) {
    res.status(200).json({
      success: true,
      paymentDetails: paymentDetails, // Send the first (and only) element in the array
    });
  } else {
    res.status(500);
    throw new Error("Error");
  }
});
