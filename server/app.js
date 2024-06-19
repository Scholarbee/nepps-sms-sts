const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorMiddleware");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5001;

// Initiating app...
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

// Setting up routes
app.get("/", (req, res) => {
  res.send("Server started successfully...");
});

const userRouter = require("./routes/userRoutes");
const studentRouter = require("./routes/studentRoutes");
const staffRouter = require("./routes/staffRoutes");
const adminRouter = require("./routes/adminRoutes");
const accountRouter = require("./routes/accountRoutes");
app.use("/api/users", userRouter);
app.use("/api/students", studentRouter);
app.use("/api/staffs", staffRouter);
app.use("/api/admin", adminRouter);
app.use("/api/account", accountRouter);

// Error display format
app.use(errorHandler);
// Setting up databse and starting the API server
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to mongoDB");
  app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
});
