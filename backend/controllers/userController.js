// Imports
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import { v4 as uuidv4 } from "uuid";
import speakeasy from "speakeasy";

//  @desc   Auth user/set token
//  @route  POST /api/users/auth
//  @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password, token } = req.body;
  const user = await User.findOne({ email });

  // Check User
  if (user) {
    // Check Passowrds
    if (await user.matchPassword(password)) {
      const secret = user.secret;

      // Check Token
      const tokenValidates = speakeasy.totp.verify({
        secret,
        encoding: "base32",
        token,
        window: 1,
      });

      if (tokenValidates) {
        generateToken(res, user._id);
        res
          .status(201)
          .json({ _id: user._id, name: user.name, email: user.email });
      } else {
        res.status(400);
        throw new Error("Invalid Token!");
      }
    } else {
      res.status(400);
      throw new Error("Invalid Email or Password!");
    }
  } else {
    res.status(400);
    throw new Error("User not found!");
  }
});

// @desc Create Secret key
// @route POST /api/users/auth
// @access Public
const getQRCode = asyncHandler(async (req, res) => {
  const id = uuidv4();
  try {
    const temp_secret = await speakeasy.generateSecret({
      name: "API Key Vault",
    });
    res.json({
      id,
      secret: temp_secret.base32,
      otpAuthURL: temp_secret.otpauth_url,
    });
  } catch (err) {
    res.status(500).json({ message: "Error generating secret key" });
  }
});

//  @desc   Register new user
//  @route  POST /api/users
//  @access Public

/*
  - Store ID, secret, name, password, email in localstorage
  - 
*/
const registerUser = asyncHandler(async (req, res) => {
  // Fetching Form Data
  const { name, email, password, secret, token, otpAuthURL } = req.body;

  // Verify Token
  try {
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
    });

    if (verified) {
      console.log("OTP Verified!");
      // Check if user exists
      const userExists = await User.findOne({ email });

      // Throw error if already exists
      if (userExists) {
        return res.status(400).json({ message: "User already exists!" });
      }

      // Add User to DB
      //   Creating a new user if it doesn't exist
      const user = await User.create({
        name,
        email,
        password,
        secret,
        otpAuthURL,
      });
      if (user) {
        console.log("User Created!");
        generateToken(res, user._id);
        res
          .status(201)
          .json({ _id: user._id, name: user.name, email: user.email });
      } else {
        return res.status(401).json({ message: "Invalid User Data!" });
      }
    } else {
      return res.status(401).json({ message: "Invalid OTP!" });
    }
  } catch (error) {
    res.status(500);
    throw new Error("Internal server error");
  }
});

//  @desc   Logout user
//  @route  POST /api/users/logout
//  @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

//  @desc   Get user profile
//  @route  GET /api/users/profile
//  @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

//  @desc   Update user profile
//  @route  PUT /api/users/profile
//  @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getQRCode,
};
