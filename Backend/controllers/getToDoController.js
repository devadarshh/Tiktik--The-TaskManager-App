import Todo from "../models/toDoSchema.js";

const getToDoController = async (req, res) => {
  try {
    const ID = req.params.id;

    const todo = await Todo.findById(ID);
    if (!todo) {
      return res.status(404).json({
        message: "To-Do Not Found",
      });
    }
    res.status(200).json({
      message: "To do fetched successfully",
      data: todo,
    });

    // retreive the to do from the database
  } catch (error) {
    res.status(500);
    res.json({
      message: `Server Error`,
      error: error.message,
    });
  }
};

export default getToDoController;
