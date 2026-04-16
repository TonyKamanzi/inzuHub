import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.routes.js";
import houseRoutes from "./routes/house.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow localhost on any port during development
      if (
        !origin ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(
  session({
    secret: "jkhiuilil",
    resave: false,
    saveUninitialized: false,

    cookie: {
      maxAge: 1000 * 69 * 60 * 24,
      httpOnly: true,
      secure: false, // Set to true if using HTTPSS
    },
  }),
);

// Routes
app.use("/auth", authRoutes);
app.use("/house", houseRoutes);
app.use("/admin", adminRoutes);
app.use("/favorites", favoriteRoutes);

const PORT = 5000 || process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log("server is running");
});
