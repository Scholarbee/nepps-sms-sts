const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const staffSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      // required: [true, "Please add a name"],
    },
    surname: {
      type: String,
      // required: [true, "Please add a name"],
    },
    otherName: {
      type: String,
    },
    gender: {
      type: String,
      // required: [true, "Please add gender"],
    },
    birthDate: {
      type: Date,
      default: Date.now,
      // required: [true, "Please add birth date"],
    },
    phone: {
      type: String,
      // required: [true, "Please add a phone number"],
    },
    address: {
      type: String,
      // required: [true, "Please add a phone number"],
    },
    religion: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    image: {
      url: String,
      public_id: String,
    },
    user: {
      isActive: { type: Boolean, default: true },
      id: {
        type: String,
        required: [true, "Please id is required"],
        unique: true,
      },
      email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please enter a valid emaial",
        ],
      },
      password: {
        type: String,
        default: "123456",
      },
      role: {
        type: String,
        default: "teacher",
      },
    },
  },
  {
    timestamps: true,
  }
);

//   Encrypt password before saving to DB
staffSchema.pre("save", async function (next) {
  if (!this.isModified("user.password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.user.password, salt);
  this.user.password = hashedPassword;
  next();
});

const Staff = mongoose.model("Staff", staffSchema);
module.exports = Staff;
