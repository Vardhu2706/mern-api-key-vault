import {
  createKey,
  getAllKeysByUser,
  getAllSharedKeysWithUser,
  updateKey,
  deleteKey,
  shareKey,
  removeShare,
} from "../controllers/keyController.js";
import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("").post(protect, createKey);
router
  .route("/user/:userId/note/:noteId")
  .put(protect, updateKey)
  .delete(protect, deleteKey);
router.route("/user/:userId").get(protect, getAllKeysByUser);
router.route("/share").post(protect, shareKey);
router
  .route()
  .get("/shared/user/:userId")
  .get(protect, getAllSharedKeysWithUser);
router
  .route("/note/:noteId/shared/:userIdToRemove")
  .delete(protect, removeShare);
