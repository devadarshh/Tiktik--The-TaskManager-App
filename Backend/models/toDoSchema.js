import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: false,
    },
    completed: {
      type: Boolean,
      require: false,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
