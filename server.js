require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const cors = require("cors");
const todoRoutes = require("./routes/todo-routes");

const app = express();
const PORT = process.env.PORT || 3000;

connectToDb();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
