import express from "express";
import { runDraw, getDraws } from "../controllers/drawController.js";
import { protect } from "../middlewares/authMiddleware.js";
import wrapAsync from "../utils/WrapAsync.js";
import { adminOnly } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Admin route (you can later restrict admin)
router.post("/run", protect, adminOnly, wrapAsync(runDraw));

// Public/user
router.get("/", protect, wrapAsync(getDraws));

export default router;