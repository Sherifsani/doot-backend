const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      enums: ["admin", "user"],
      default: "user",
      type: String,
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("User", userModel)