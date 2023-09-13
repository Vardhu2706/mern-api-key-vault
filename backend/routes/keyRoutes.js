import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createKey, getAllKeys } from "../controllers/keyController.js";

const router = express.Router();

router.route("/").post(protect, createKey).get(protect, getAllKeys);
export default router;
