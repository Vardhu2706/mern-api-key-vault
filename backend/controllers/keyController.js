// Imports
import asyncHandler from "express-async-handler";
import Key from "../models/keyModel.js";
import User from "../models/userModel.js";

// @desc Create a key
// @route POST /api/keys
// @access Private
const createKey = asyncHandler(async (req, res) => {
  try {
    const { title, body, owner } = req.body;

    const accessList = [];
    accessList.push(owner);

    const key = await Key.create({
      title,
      body,
      owner,
      accessList,
    });

    if (key) {
      res.status(201).json(key);
    } else {
      res.status(401);
      throw new Error("Key Creation Failed!");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Key Creation Failed!");
  }
});

const getKey = asyncHandler(async (req, res) => {});

const getAllKeys = asyncHandler(async (req, res) => {
  const owner = req.body.user._id;
  try {
    const keyList = await Key.find({ owner });

    res.status(200).json({ keyList });
  } catch (error) {
    res.status(404).json({ message: "Keys not found!" });
  }
});

const updateKey = asyncHandler(async (req, res) => {});

const deleteKey = asyncHandler(async (req, res) => {});

const provideAccess = asyncHandler(async (req, res) => {
  // const {keyId, newUser, }
  // Get New User ID

  // Get Key ID
  const key = await Key.findOne({ _id: keyId });
  const accessList = key.accessList;
  accessList.push(newUserId);
  key = await Key.update({ accessList: [...accessList] });

  const newUserId = req.body.newUserId;
  const owner = req.body.user._id;
});

const removeAccess = asyncHandler(async (req, res) => {});

export { createKey, getAllKeys };
