import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getCharities, selectCharity } from "../controllers/charityController.js";

const router = express.Router();

router.get("/", protect, getCharities);
router.post("/select", protect, selectCharity);

export default router;