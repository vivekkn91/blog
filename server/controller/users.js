const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/user");

const adduser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Create a new user instance
  const newUser = new User({
    name,
    email,
    password,
  });

  try {
    // Save the new user
    const savedUser = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: savedUser,
    });
  } catch (error) {
    // Handle validation or save errors
    return res.status(400).json({
      success: false,
      message: "Failed to add user",
      error: error.message,
    });
  }
});

module.exports = { adduser };
