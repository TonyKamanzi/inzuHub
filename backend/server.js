import express from "express";
import dotenv from "dotenv";
import connectDB from "./controllers/db.js";
import cors from "cors"

dotenv.config();

const app = express();
app.use(express.json());


const PORT = 5000 || process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log("server is running");
});
