import express from "express";
import {
  createHouse,
  getHouses,
  getHouseById,
  updateHouse,
  deleteHouse,
} from "../controllers/house.controller.js";
import { authorizeRoles, isLoggedIn } from "../middleware/sessionMiddleware.js";

const router = express.Router();

router.post("/", isLoggedIn, authorizeRoles("landlord"), createHouse);
router.get("/", getHouses);
router.get("/:id", getHouseById);
router.put("/:id", isLoggedIn, authorizeRoles("landlord"), updateHouse);
router.delete("/:id", isLoggedIn, authorizeRoles("landlord"), deleteHouse);

export default router;
