import express from "express";
import { signup, login, logout, getUsers, getCurrentUser } from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middleware/sessionMiddleware.js";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", isLoggedIn, logout);
router.get("/current", getCurrentUser);
router.get("/", isLoggedIn, getUsers);

export default router;
