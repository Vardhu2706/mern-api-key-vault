import mongoose from "mongoose";
import Cryptr from "cryptr";
const cryptr = new Cryptr("apikeyvault2023", {
  pbkdf2Iterations: 10000,
  saltLength: 10,
});

const keySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Add methods to encrypt and decrypt
keySchema.methods.encryptBody = async function (plaintText) {
  console.log(plaintText);
  // console.log("Plain Text: ", plaintText);
  // return await cryptr.encrypt(plaintText);
  console.log("Hello");
};

keySchema.methods.decryptBody = async function (encryptedText) {
  return await cryptr.decrypt(encryptedText);
};

const Key = mongoose.model("Key", keySchema);
export default Key;
