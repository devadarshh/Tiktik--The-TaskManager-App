import express from "express";
import deleteToDoController from "../controllers/deleteToDoController.js";

const router = express.Router();

router.delete("/delete/:id", deleteToDoController);

export default router;
