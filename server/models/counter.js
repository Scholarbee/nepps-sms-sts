const mongoose = require("mongoose");

const counterSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    seq: {
      type: Number,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Counter = mongoose.model("Counter", counterSchema);
module.exports = Counter;
