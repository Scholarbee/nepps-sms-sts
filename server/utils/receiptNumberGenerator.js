const Counter = require("../models/counter");

/**
 * This function generate and return a unique receipt number
 * @returns Unique receipt number
 */
exports.receiptNumberGenerator = async () => {
  // Update and get the current sequence value for the user counter
  const counter = await Counter.findOneAndUpdate(
    { _id: "66780a7f313a7115d8d9f078" },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );

  const sequenceNumber = counter.seq;

  // Pad the sequence number to ensure it's 5 digits long
  const paddedNumber = String(sequenceNumber).padStart(5, "0");

  let receiptNumber = "N313011" + paddedNumber;

  return receiptNumber;
};
