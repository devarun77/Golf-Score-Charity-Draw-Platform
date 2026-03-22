import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import wrapAsync from "../utils/WrapAsync.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";
import { updateSubscription } from "../controllers/adminController.js";
import { updateUserScores } from "../controllers/adminController.js";
import {
  getAllUsers,
  getWinners,
  getStats
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/users", protect, adminOnly, wrapAsync(getAllUsers));
router.get("/winners", protect, adminOnly, wrapAsync(getWinners));
router.get("/stats", protect, adminOnly, wrapAsync(getStats));
router.post("/subscription", protect, adminOnly, wrapAsync(updateSubscription));
router.post("/scores", protect, adminOnly, wrapAsync(updateUserScores));

export default router;