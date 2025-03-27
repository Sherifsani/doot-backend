const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Error connecting the database: ", error);
    process.exit(1);
  }
};

module.exports = connectToDb