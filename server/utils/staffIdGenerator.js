const Counter = require("../models/counter");

/**
 * This function generate and return a unique staff ID
 * @returns Unique staff id
 */
exports.staffIdGenerator = async () => {
  // Update and get the current sequence value for the user counter
  const counter = await Counter.findOneAndUpdate(
    { _id: "666d913be5118dca69897d4c" },
    { $inc: { seq: 1 } },
    { returnDocument: "after", upsert: true }
  );

  const sequenceNumber = counter.seq;

  // Pad the sequence number to ensure it's 6 digits long
  const paddedNumber = String(sequenceNumber).padStart(4, "0");

  let staffId = "NEPPS136" + paddedNumber;

  return staffId;
};
