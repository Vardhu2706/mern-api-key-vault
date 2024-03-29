// Key Model

// Imports
import mongoose, { mongo } from "mongoose";
import Cryptr from "cryptr";

const cryptr = new Cryptr("apiKeyVault2024", {
  pbkdf2Iterations: 1000,
  saltLengthL: 10,
});

const sharedWithSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const keySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    apiKey: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    docs: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    email: {
      type: String,
      required: true
    },
    sharedWith: [sharedWithSchema]
  },
  {
    timestamps: true
  }
);

const Key = mongoose.model("Key", keySchema);
export default Key;