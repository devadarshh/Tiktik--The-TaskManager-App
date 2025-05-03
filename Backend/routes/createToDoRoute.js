import express from "express";
import createToDoController from "../controllers/createToDoController.js";
const router = express.Router();

router.post("/createToDo", createToDoController);

export default router;
