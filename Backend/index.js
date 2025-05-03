import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./database/dbConnection.js";
import createToDoRouter from "./routes/createToDoRoute.js";
import getToDoRouter from "./routes/getToDoRoute.js";
import deleteToDoRouter from "./routes/deleteToDoRoute.js";
import updateToDoRouter from "./routes/updateToDoRoute.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  res.json({
    message: `Health is PERFECT!`,
  });
});
app.use("/api/v1/todos", createToDoRouter);
app.use("/api/v1/todos", getToDoRouter);
app.use("/api/v1/todos", updateToDoRouter);
app.use("/api/v1/todos", deleteToDoRouter);

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is Running on PORT ${PORT}`);
});

export default app;
