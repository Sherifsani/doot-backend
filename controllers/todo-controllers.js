const Todo = require("../model/Todo");

const createTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    if (!todo) {
      return res.status(400).json({
        success: false,
        message: "todo is required",
      });
    }
    const newTodo = new Todo({ todo });
    await newTodo.save();
    res.status(200).json({
      success: true,
      message: "todo created successfully",
      data: newTodo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error creating todo",
    });
  }
};

const fetchTodos = async (req, res) => {
    try {
        const todos = await Todo.find({})
        if(!todos) {
            return res.status(400).json({
                success: false,
                message: "no todos found",
            })
        }
        res.status(200).json({
            success: true,
            message: "todos fetched successfully",
            data: todos
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "error fetching todos"
        })
    }
}

const deleteTodo = async (req, res) => {
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if(!todo) {
            return res.status(400).json({
                success: false,
                message: "todo not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "todo deleted successfully",
            data: todo
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "error deleting todo"
        })
    }
}

module.exports = {
  createTodo,
  fetchTodos,
  deleteTodo
};
