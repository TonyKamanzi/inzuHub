import express from "express";
import { isLoggedIn, authorizeRoles } from "../middleware/sessionMiddleware.js";

import {
  getStats,
  getAllUsers,
  deleteUser,
  getPendingLandlords,
  approveLandlord,
  rejectLandlord,
  getAllHouses,
  deleteHouse,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Only admin can access these routes
router.use(isLoggedIn, authorizeRoles("admin"));

// Stats
router.get("/stats", getStats);

// Users management
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// Pending landlords
router.get("/pending-landlords", getPendingLandlords);
router.put("/approve-landlord/:id", approveLandlord);
router.put("/reject-landlord/:id", rejectLandlord);

// Houses management
router.get("/houses", getAllHouses);
router.delete("/houses/:id", deleteHouse);

export default router;
