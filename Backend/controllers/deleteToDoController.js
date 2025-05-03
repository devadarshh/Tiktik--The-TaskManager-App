import Todo from "../models/toDoSchema.js";

const deleteToDoController = async (req, res) => {
  try {
    const ID = req.params.id;
    const deleteToDo = await Todo.findByIdAndDelete(ID);
    if (!deleteToDo) {
      return res.status(404).json({
        message: "To-Do not found",
      });
    }

    res.status(200).json({
      message: "To-Do-Deleted Successfully!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export default deleteToDoController;
