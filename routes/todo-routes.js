const express = require("express");
const { createTodo, fetchTodos } = require('../controllers/todo-controllers')

const authMiddleware = require('../middleware/auth-middleware')
const router = express.Router();


router.post('/create', authMiddleware, createTodo)
router.get('/all', authMiddleware, fetchTodos)

module.exports = router
