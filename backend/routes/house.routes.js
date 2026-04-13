import express from "express";
import {
  createHouse,
  getHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
  getLandlordHouses,
  getLandlordStats,
} from "../controllers/house.controller.js";
import { authorizeRoles, isLoggedIn } from "../middleware/sessionMiddleware.js";

const router = express.Router();

// Landlord routes
router.get(
  "/landlord/my-houses",
  isLoggedIn,
  authorizeRoles("landlord"),
  getLandlordHouses,
);
router.get(
  "/landlord/stats",
  isLoggedIn,
  authorizeRoles("landlord"),
  getLandlordStats,
);

// Public and authenticated routes
router.post("/", isLoggedIn, authorizeRoles("landlord"), createHouse);
router.get("/", getHouses);
router.get("/:id", getHouseById);
router.put("/:id", isLoggedIn, authorizeRoles("landlord"), updateHouse);
router.delete("/:id", isLoggedIn, authorizeRoles("landlord"), deleteHouse);

export default router;
