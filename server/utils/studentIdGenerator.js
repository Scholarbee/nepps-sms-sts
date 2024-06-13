const Counter = require("../models/counter");

/**
 * This function generate and return a unique student ID
 * @returns Unique student id
 */
exports.studentIdGenerator = async () => {
  // Update and get the current sequence value for the user counter
  const counter = await Counter.findOneAndUpdate(
    { _id: "66585f7b0211f9dfe13647c0" },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );

  const sequenceNumber = counter.seq;

  // Pad the sequence number to ensure it's 6 digits long
  const paddedNumber = String(sequenceNumber).padStart(4, "0");

  let studentId = "NEPPS515" + paddedNumber;

  return studentId;
};
