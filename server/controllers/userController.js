const Staff = require("../models/Staff");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Token = require("../models/tokenModel");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Login user
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required.");
  }

  // Email auth
  const user = await Staff.findOne({ "user.email": email });
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  // Password auth
  const verified = await bcrypt.compare(password, user.user.password);
  if (!verified) {
    res.status(400);
    throw new Error("Wrong Email or Password.");
  }

  //   Generate Token
  const token = generateToken(user._id);

  if (verified) {
    // Send HTTP-only cookie
    res.cookie("Token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });
  }
  if (user && verified) {
    const { _id, name, email, photo, city, phone, bio, dob, userType, gender } =
      user;
    res.status(200).json({
      _id,
      name,
      dob,
      gender,
      phone,
      city,
      bio,
      userType,
      email,
      photo,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout User
exports.logout = asyncHandler(async (req, res) => {
  res.cookie("artikonToken", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Successfully Logged Out" });
});

// Get Login Status
exports.loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.artikonToken;
  if (!token) {
    return res.json(false);
  }
  // Verify Token
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (verified) {
    return res.json(true);
  }
  return res.json(false);
});

// Change password
exports.changePassword = asyncHandler(async (req, res) => {
  const user = await Staff.findById(req.user._id);
  const { oldPassword, password, password2 } = req.body;

  if (!user) {
    res.status(400);
    throw new Error("User not found, please signup");
  }
  //Validate
  if (!oldPassword || !password || !password2) {
    res.status(400);
    throw new Error("Please all field are required");
  }

  // check if old password matches password in DB
  const passwordIsCorrect = await bcrypt.compare(
    oldPassword,
    user.user.password
  );

  // Save new password
  if (user && passwordIsCorrect) {
    if (password !== password2) {
      res.status(400);
      throw new Error("Please password mismatch");
    }

    user.user.password = password;
    await user.save();
    res.status(200).send("Password change successful");
  } else {
    res.status(400);
    throw new Error("Old password is incorrect");
  }
});

// Forgot password
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await Staff.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("User does not exist");
  }

  // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });
  if (token) {
    await token.deleteOne();
  }

  // Create Reste Token
  let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
  console.log(resetToken);

  // Hash token before saving to DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Save Token to DB
  await new Token({
    userId: user._id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
  }).save();

  // Construct Reset Url
  const resetUrl = `${process.env.FRONTEND_URL}/#/reset-password/${resetToken}`;

  // Reset Email
  const message = `
      <h2>Hello, ${user.name}</h2>
      <p>Please use the url below to reset your password</p>  
      <p>This reset link is valid for only 30minutes.</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Regards...</p>
      <p>Artikon Team</p>
    `;
  const subject = "Password Reset Request";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Reset Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Reset Password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  console.log(password);
  console.log(resetToken);
  // Hash token, then compare to Token in DB
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // fIND tOKEN in DB
  const userToken = await Token.findOne({
    token: hashedToken,
    expiresAt: { $gt: Date.now() },
  });
  console.log(userToken);
  if (!userToken) {
    res.status(404);
    throw new Error("Invalid or Expired Token");
  }

  // Find user
  const user = await Staff.findOne({ _id: userToken.userId });
  user.password = password;
  await user.save();
  res.status(200).json({
    message: "Password Reset Successful, Please Login",
  });
});

// Block user
exports.blockUser = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const user = await Staff.findByIdAndUpdate(
    id,
    { isActive: false },
    { new: true }
  );

  // Reset Email
  const message = `
      <h2>Hello, ${user.name}</h2>
      <p>Please your account has been suspended</p>  
      <p>If you think this is wrong, please file \n a report to the system administrators via the website</p>

      <a href="https://artikon-alx-2qcy.onrender.com" clicktracking=off>Click here to place a report</a>

      <p>Regards...</p>
      <p>Artikon Team</p>
    `;
  const subject = "Suspention Of Account";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});

// Unblock user
exports.unblockUser = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const user = await Staff.findByIdAndUpdate(
    id,
    { isActive: true },
    { new: true }
  );
  // Reset Email
  const message = `
      <h2>Hello, ${user.name}</h2>
      <p>Please your account has been reactivated</p>  
      <p>Visit the official website for more info.</p>

      <a href="https://artikon-alx-2qcy.onrender.com" clicktracking=off>Click here to place a report</a>

      <p>Regards...</p>
      <p>Artikon Team</p>
    `;
  const subject = "Suspention Of Account";
  const send_to = user.email;
  const sent_from = process.env.EMAIL_USER;

  try {
    await sendEmail(subject, message, send_to, sent_from);
    res.status(200).json({ success: true, message: "Email Sent" });
  } catch (error) {
    res.status(500);
    throw new Error("Email not sent, please try again");
  }
});
