const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = mongoose.Schema(
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
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "Class",
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
    nhis: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    residency: {
      type: String,
      default: "Day",
      // required: [true, "Please add a residency"],
    },
    image: {
      public_id: { type: String },
      url: { type: String },
    },
    motherName: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    motherAddress: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    motherPhone: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    motherOccupation: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    fatherName: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    fatherAddress: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    fatherPhone: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    fatherOccupation: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    emergencyContactName: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    emergencyContactAddress: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    emergencyContactPhone: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    emergencyContactOccupation: {
      type: String,
      // required: [true, "Please add a residency"],
    },
    user: {
      isActive: { type: Boolean, default: true },
      id: {
        type: String,
        // required: [true, "Please add a student id"],
        // unique: true,
      },
      password: {
        type: String,
        // required: [true, "Please password is required"],
      },
      role: {
        type: String,
        default: "student",
      },
    },
  },
  {
    timestamps: true,
  }
);

//   Encrypt password before saving to DB
studentSchema.pre("save", async function (next) {
  if (!this.isModified("user.password")) {
    return next();
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.user.password, salt);
  this.user.password = hashedPassword;
  next();
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
