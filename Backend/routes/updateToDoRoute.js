import express from "express";
import updateToDoController from "../controllers/updateToDoController.js";

const router = express.Router();

router.put("/edit/:id", updateToDoController);

export default router;
