import Todo from "../models/toDoSchema.js";

const createToDoController = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Title is Required",
      });
    }
    const newTodo = new Todo({
      title,
      description: description || "",
      completed: completed ?? false,
    });
    const savedToDo = await newTodo.save();
    res.status(201).json(savedToDo);
  } catch (error) {
    res.status(500);
    res.json({
      message: `Server Error`,
      error: error.message,
    });
  }
};
export default createToDoController;
