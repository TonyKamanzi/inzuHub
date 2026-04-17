import express from "express";
import {
  createBooking,
  getLandlordBookings,
  updateBookingStatus,
  getTenantBookings,
} from "../controllers/booking.controller.js";
import { isLoggedIn, authorizeRoles } from "../middleware/sessionMiddleware.js";

const router = express.Router();

// Public booking creation
router.post("/", createBooking);

// Landlord booking management
router.get(
  "/landlord",
  isLoggedIn,
  authorizeRoles("landlord"),
  getLandlordBookings,
);

router.put(
  "/:id/status",
  isLoggedIn,
  authorizeRoles("landlord"),
  updateBookingStatus,
);

// Tenant booking management
router.get("/tenant", isLoggedIn, authorizeRoles("tenant"), getTenantBookings);

export default router;
