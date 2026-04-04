import express from "express";
import {
  isLoggedIn,
  authorizeRoles,
} from "../middleware/sessionMiddleware.js";

import {
  getPendingLandlords,
  approveLandlord,
  rejectLandlord,
} from "../controllers/admin.controller.js";

const router = express.Router();

// Only admin can access these routes
router.use(isLoggedIn, authorizeRoles("admin"));

// Get all pending landlords
router.get("/pending-landlords", getPendingLandlords);

// Approve landlord
router.put("/approve-landlord/:id", approveLandlord);

// Reject landlord
router.put("/reject-landlord/:id", rejectLandlord);

export default router;
