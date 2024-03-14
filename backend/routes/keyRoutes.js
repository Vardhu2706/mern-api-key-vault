import express from "express";
import {
  createKey,
  getKeysByUser,
  getSharedKeys,
  updateKey,
  deleteKey,
  shareKey,
  removeShare
} from "../controllers/keyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createKey);

router.route("/user")
  .get(protect, getKeysByUser);

router.route("/key/:keyId")
  .put(protect, updateKey)
  .delete(protect, deleteKey);

router.route("/share")
  .post(protect, shareKey);

router.route("/shared")
  .get(protect, getSharedKeys);

router.route("/key/:keyId/unshare/:userIdToRemove")
  .delete(protect, removeShare);

export default router;
