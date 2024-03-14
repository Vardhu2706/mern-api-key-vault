// Imports
import asyncHandler from "express-async-handler";
import Key from "../models/keyModel.js";
import User from "../models/userModel.js";

// @desc Create a key
// @route POST /api/keys
// @access Private
const createKey = asyncHandler(async (req, res) => {
  try {
    const { title, content, desc, documentation, authorId } = req.body;

    const key = await Key.create({
      title,
      content,
      desc,
      documentation,
      author: authorId,
    });

    if (key) {
      res.status(201).json(key);
    } else {
      res.status(401);
      throw new Error("Key Creation Failed");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Error creating key");
  }
});

// To-DO: Write DESC
const getAllKeysByUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;
    const keys = await Key.find({ author: userId });

    if (keys) {
      res.status(200).json(notes);
    } else {
      res.status(500);
      throw new Error("Internal server error");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

// Get all shared keys
const getAllSharedKeysWithUser = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.params;

    const sharedKeys = await Key.find({ sharedWith: { $in: [userId] } })
      .populate("author")
      .exec();

    if (sharedKeys.length !== 0) {
      res.status(200).json(sharedKeys);
    } else {
      res.status(404);
      throw new Error("No shared keys found for the user");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

// Update Key
const updateKey = asyncHandler(async (req, res) => {
  try {
    const { userId, keyId } = req.params;
    const { title, content, desc, documentation } = req.body;

    const updatedKey = await Note.findOneAndUpdate(
      { __id: keyId, author: userId },
      { title, content, desc, documentation },
      { new: true }
    );

    if (updatedNote) {
      res.status(200).json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Not not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

// Delete Key
const deleteKey = asyncHandler(async (req, res) => {
  try {
    const { userId, keyId } = req.params;
    const deleteKey = await Key.findOneAndDelete({
      _id: keyId,
      author: userId,
    });

    if (deleteKey) {
      res.status(200).json({ message: "Key deleted" });
    } else {
      res.status(404);
      throw new Error("Key not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

// Share Key
const shareKey = asyncHandler(async (req, res) => {
  try {
    const { keyId, userIdToShareWith } = req.body;
    const key = await Key.findById(keyId);

    if (key) {
      const userToShareWith = await findById(userIdToShareWith);

      if (userToShareWith) {
        if (key.sharedWith.includes(userIdToShareWith)) {
          res.status(400);
          throw new Error("Key already shared with the user");
        } else {
          key.sharedWith.push(userIdToShareWith);
          await key.save();

          res.status(200).json({ message: "Key shared successfully" });
        }
      } else {
        res.status(404);
        throw new Error("User to share not found");
      }
    } else {
      res.status(404);
      throw new Error("Key not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

// Remove Share
const removeShare = asyncHandler(async (req, res) => {
  try {
    const { keyId, userIdToRemove } = req.params;

    const key = await Key.findById(keyId);

    if (key) {
      const userToRemove = await User.findById(userIdToRemove);

      if (userToRemove) {
        if (key.sharedWith.includes(userIdToRemove)) {
          key.sharedWith.pull(userIdToRemove);
          await key.save();
        } else {
          res.status(400);
          throw new Error("Key is not shared with the user");
        }
      } else {
        res.status(404);
        throw new Error("User to remove not found");
      }
    } else {
      res.status(404);
      throw new Error("Key not found");
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

export {
  createKey,
  getAllKeysByUser,
  getAllSharedKeysWithUser,
  updateKey,
  deleteKey,
  shareKey,
  removeShare,
};
