const mongoose = require("mongoose");

const todoModel = new mongoose.Schema(
  {
    todo: {
      require: true,
      type: String,
      max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoModel);
