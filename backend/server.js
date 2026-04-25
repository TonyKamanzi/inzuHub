import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import session from "express-session";

import authRoutes from "./routes/auth.routes.js";
import houseRoutes from "./routes/house.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import favoriteRoutes from "./routes/favorite.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

dotenv.config();

const app = express();

// =====================
// Middleware
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIXED CORS (ALLOW YOUR FRONTEND)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev
      "http://127.0.0.1:5173",
      "https://inzuhub-neuw.onrender.com", // ⚠️ replace with your FRONTEND URL if different
    ],
    credentials: true,
  }),
);

// ✅ FIXED SESSION CONFIG (WORKS IN PRODUCTION)
app.use(
  session({
    name: "sessionId",
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true on Render
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);

// =====================
// Routes
// =====================
app.use("/auth", authRoutes);
app.use("/house", houseRoutes);
app.use("/admin", adminRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/bookings", bookingRoutes);

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
