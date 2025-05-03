import express from "express";
import getToDoController from "../controllers/getToDoController.js";
const router = express.Router();

router.get("/getToDo/:id", getToDoController);

export default router;
