import express from "express";
import dotenv from "dotenv";
import connectDB from "./controllers/db.js";
import cors from "cors"
import session from "express-session";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(
  session({
      secret: process.env.SESSION_SCRECT,
      resave: false,
      saveUninitialized: false,
      cookie: {
          maxAge: 1000 * 69 * 60 * 24
      }
  }),
);

const PORT = 5000 || process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log("server is running");
});
