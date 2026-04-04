import express from "express";
import { isLoggedIn, authorizeRoles } from "../middleware/sessionMiddleware.js";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favorite.controller.js";

const router = express.Router();

// Only tenants can favorite
router.post("/", isLoggedIn, authorizeRoles("tenant"), addFavorite);

router.delete(
  "/",
  isLoggedIn,
  authorizeRoles("tenant"),
  removeFavorite,
);

router.get("/", isLoggedIn, authorizeRoles("tenant"), getFavorites);

export default router;
