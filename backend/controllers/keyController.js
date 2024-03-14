// Keys Controller

// Import
import expressAsyncHandler from "express-async-handler";
import Key from "../models/keyModel.js";
import User from "../models/userModel.js";

// @desc    Create a key
// @route   POST /api/keys
// @access  Private
const createKey = expressAsyncHandler(async (req, res) => {
  try {
    const { title, apiKey, desc, docs } = req.body;
    console.log({ title, apiKey, desc, docs });

    // Validate the input
    if (!title || !apiKey || !desc || !docs) {
      res.status(400); // Bad request
      throw new Error("All fields are required");
    }

    if (!req.user) {
      res.status(403); // Forbidden
      throw new Error("User not authenticated");
    }

    // Create the key
    const key = await Key.create({
      title,
      apiKey,
      desc,
      docs,
      author: req.user._id // Use the authenticated user's ID as the author
    });

    // Successfully created the key
    return res.status(201).json(key);

  } catch (error) {
    console.error("Key creation error:", error);
    res.status(500).json({ message: "An error occurred while creating the key", error: error.message });
  }
});


// @desc    Fetch all keys created by the logged-in user
// @route   GET /api/keys/user
// @access  Private
const getKeysByUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const keys = await Key.find({ author: userId });
    return res.status(200).json(keys);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching user keys');
  }
});


// @desc    Fetch all keys shared with the logged-in user
// @route   GET /api/keys/shared
// @access  Private
const getSharedKeys = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const keys = await Key.find({ sharedWith: userId });
    return res.status(200).json(keys);
  } catch (error) {
    res.status(500);
    throw new Error('Error fetching shared keys');
  }
});


// @desc    Update a key's details
// @route   PUT /api/keys/:id
// @access  Private
const updateKey = expressAsyncHandler(async (req, res) => {
  try {
    const { title, apiKey, desc, docs } = req.body;
    const key = await Key.findById(req.params.id);

    if (key) {
      key.title = title || key.title;
      key.desc = desc || key.desc;
      key.docs = docs || key.docs;
      const updatedKey = await key.save();
      return res.status(200).json(updatedKey);
    }
  } catch (error) {
    res.status(500);
    throw new Error('Error updating key');
  }
});


// @desc    Delete a key
// @route   DELETE /api/keys/:id
// @access  Private
const deleteKey = expressAsyncHandler(async (req, res) => {
  try {
    const key = await Key.findById(req.params.id);
    if (key) {
      await key.remove();
      return res.send({ message: 'Key deleted successfully' });
    } else {
      res.status(404);
      throw new Error('Key not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Error deleting key');
  }
});


// @desc    Share a key with another user
// @route   POST /api/keys/share
// @access  Private
const shareKey = expressAsyncHandler(async (req, res) => {
  try {
    const { keyId, userIdToShare } = req.body;
    const key = await Key.findById(keyId);

    if (key && !key.sharedWith.includes(userIdToShare)) {
      key.sharedWith.push(userIdToShare);
      await key.save();
      return res.send({ message: 'Key shared successfully' });
    } else {
      res.status(400)
      throw new Error('Key already shared with this user or key not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Error sharing key');
  }
});



// @desc    Remove a user from a key's sharedWith list
// @route   POST /api/keys/unshare
// @access  Private
const removeShare = expressAsyncHandler(async (req, res) => {
  try {
    const { keyId, userIdToRemove } = req.body;
    const key = await Key.findById(keyId);

    if (key) {
      key.sharedWith = key.sharedWith.filter(userId => userId.toString() !== userIdToRemove);
      await key.save();
      return res.send({ message: 'User removed from shared list' });
    } else {
      res.status(404);
      throw new Error('Key not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Error removing user from shared list');
  }

});


export {
  createKey,
  getKeysByUser,
  getSharedKeys,
  updateKey,
  deleteKey,
  shareKey,
  removeShare
};