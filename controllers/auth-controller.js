const jwt = require("jsonwebtoken");
const User = require("../model/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Convert email to lowercase to avoid case sensitivity issues
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with that email already exists!",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      email: email.toLowerCase(), // Ensure consistent email storage
      password: hashedPassword, // Fix: store hashed password correctly
      role: role || "user",
    });

    // Save user to DB
    await newUser.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user with email exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "user with email does not exist",
      });
    }
    if (!await bcrypt.compare(password, existingUser.password)) {
      res.status(500).json({
        success: false,
        message: "incorrect password",
      });
    }
    const accessToken = jwt.sign(
      {
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    res.json({
      success: true,
      message: "successfully logged in",
      data: {
        email: existingUser.email,
        role: existingUser.role,
        accessToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error login user",
    });
  }
};

module.exports = { registerUser, loginUser };
