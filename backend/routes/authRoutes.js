
import express from "express";
import { registerUser, loginUser } from "../controllers/authcontroller.js";
import wrapAsync from "../utils/WrapAsync.js";

const router = express.Router();

router.post("/signup", wrapAsync(registerUser));
router.post("/login", wrapAsync(loginUser));

export default router;