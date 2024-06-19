const expressAsyncHandler = require("express-async-handler");
const Fee = require("../models/Fee");

/**
 *
 */
exports.getCurrentBill = expressAsyncHandler(async (req, res, next) => {
  const currentBill = await Fee.findOne({
    studentId: req.params.id,
    isActive: true,
  }).populate("studentId");
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
