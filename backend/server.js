import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    secret: process.env.SESSION_SCRECT,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 69 * 60 * 24,
    },
  }),
);

// Routes
app.use("/auth", authRoutes);

const PORT = 5000 || process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log("server is running");
});
