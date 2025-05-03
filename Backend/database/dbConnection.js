import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const DB_URI = process.env.MONGO_DB_URL;

const dbConnection = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("DB Connection Successfully!");
  } catch (error) {
    console.log(`DB Connection Fail`, error.message);
  }
};


export default dbConnection;
