import express from "express";
import { addScore, getScores } from "../controllers/scoreController.js";
import { protect } from "../middlewares/authMiddleware.js";
import wrapAsync from "../utils/WrapAsync.js";

const router = express.Router();

router.post("/add", protect, wrapAsync(addScore));
router.get("/", protect, wrapAsync(getScores));

export default router;