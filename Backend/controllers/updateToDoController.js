import express from "express";
import Todo from "../models/toDoSchema.js";

const updateToDoController = async (req, res) => {
  try {
    const ID = req.params.id;
    const { title, description, completed } = req.body;
    if (!title) {
      return res.status(500).json({
        message: "Missing Fields!",
      });
    }
    const updateToDo = {};
    if (title !== undefined) updateToDo.title = title;
    if (description !== undefined) updateToDo.description = description;
    if (completed !== undefined) updateToDo.completed = completed;

    if (Object.keys(updateToDo).length === 0) {
      return res.status(400).json({
        message: "No Fields provided to update",
      });
    }

    const updatedToDo = await Todo.findByIdAndUpdate(ID, updateToDo, {
      new: true,
    });
    if (!updatedToDo) {
      return res.status(500).json({
        message: "To-Do not found",
      });
    }
    return res.status(200).json({
      message: "To-do Updated Successfully",
      data: updatedToDo,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export default updateToDoController;
