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
    const { title, apiKey, desc, docs, } = req.body;

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
      author: req.user._id,
      email: req.user.email,
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

    // Update the query to match the userId inside the objects of the sharedWith array
    const keys = await Key.find({ "sharedWith.userId": userId });

    res.status(200).json(keys);
  } catch (error) {
    console.error('Error fetching shared keys:', error);
    res.status(500).send({ message: 'Error fetching shared keys', error: error.toString() });
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
// @route   DELETE /api/keys/:keyId
// @access  Private
const deleteKey = expressAsyncHandler(async (req, res) => {
  try {
    const result = await Key.findByIdAndDelete(req.params.keyId);

    if (result) {
      return res.send({ message: 'Key deleted successfully' });
    } else {
      res.status(404);
      throw new Error('Key not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Error sharing key');
  }
});


// @desc    Share a key with another user
// @route   POST /api/keys/share
// @access  Private
const shareKey = expressAsyncHandler(async (req, res) => {
  try {
    const { keyId, userEmailToShare } = req.body;

    // Prevent user from sharing the key with themselves
    if (req.user.email === userEmailToShare) {
      return res.status(400).send({ message: "Cannot share the key with yourself" });
    }

    const userToShareWith = await User.findOne({ email: userEmailToShare });
    if (!userToShareWith) {
      return res.status(404).send({ message: 'User not found' });
    }

    const key = await Key.findById(keyId);
    if (!key) {
      return res.status(404).send({ message: 'Key not found' });
    }

    const isAlreadyShared = key.sharedWith.some(sharedUser => sharedUser.userId.equals(userToShareWith._id));
    if (isAlreadyShared) {
      return res.status(400).send({ message: 'Key already shared with this user' });
    }

    const sharedUserDetails = {
      userId: userToShareWith._id,
      email: userToShareWith.email
    };

    key.sharedWith.push(sharedUserDetails);
    await key.save();

    res.send({ message: 'Key shared successfully', sharedUser: sharedUserDetails });
  } catch (error) {
    console.error('Error sharing key:', error);
    res.status(500).send({ message: 'Error sharing key', error: error.toString() });
  }
});



// @desc    Remove a user from a key's sharedWith list
// @route   POST /api/keys/unshare
// @access  Private
const removeShare = expressAsyncHandler(async (req, res) => {

  try {

    const { keyId, userIdToRemove } = req.params;
    const key = await Key.findById(keyId);

    if (key) {
      key.sharedWith = key.sharedWith.filter(shared => !shared.userId.equals(userIdToRemove));
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