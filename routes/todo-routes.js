const express = require("express");
const {
  createTodo,
  fetchTodos,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo-controllers");

const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();

router.post("/create", authMiddleware, createTodo);
router.get("/all", authMiddleware, fetchTodos);
router.delete("/delete/:id", authMiddleware, deleteTodo);
router.put("/update/:id", authMiddleware, updateTodo);

module.exports = router;
