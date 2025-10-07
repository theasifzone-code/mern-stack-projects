import crypto from "crypto";
import asyncHandler from "express-async-handler";
import ApiKey from "../models/apiKeyModel.js";

// 🔑 Helper: Secure Key Generator (SHA256 hash)
const generateSecureKeyInfo = async () => {
  const plainKey = crypto.randomBytes(32).toString("hex"); // 64 chars
  const keyHash = crypto.createHash("sha256").update(plainKey).digest("hex");
  const keyIdentifier = plainKey.substring(0, 8); // safe short ID

  // ensure unique identifier
  const existing = await ApiKey.findOne({ keyIdentifier });
  if (existing) return generateSecureKeyInfo();

  return { plainKey, keyHash, keyIdentifier };
};

// 📌 Generate New API Key
export const generateApiKey = asyncHandler(async (req, res) => {
  // check existing active key
  const existingKey = await ApiKey.findOne({ user: req.user._id, isActive: true });
  if (existingKey) {
    return res.status(400).json({
      success: false,
      message: "An active API key already exists. Revoke it before generating a new one.",
      data: { identifier: existingKey.keyIdentifier }
    });
  }

  // generate secure key
  const { plainKey, keyHash, keyIdentifier } = await generateSecureKeyInfo();

  // expiry 30 days
  const validityDays = 30;
  const expiresAt = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000);

  // save in DB
  const newApiKey = await ApiKey.create({
    keyHash,
    keyIdentifier,
    user: req.user._id,
    name: `${req.user?.username || "User"}'s Key`,
    expiresAt,
  });

  // return plain key one-time only
  res.status(201).json({
    success: true,
    message: "API Key generated successfully (save it securely, shown only once).",
    data: {
      apiKey: plainKey,
      identifier: newApiKey.keyIdentifier,
      expiresAt
    }
  });
});

// Revoke Key
export const revokeApiKey = asyncHandler(async (req, res) => {
  const apiKey = await ApiKey.findOne({ user: req.user._id, isActive: true });

  if (!apiKey) {
    return res.status(404).json({
      success: false,
      message: "No active API key found."
    });
  }

  apiKey.isActive = false;
  apiKey.expiresAt = new Date();
  await apiKey.save();

  res.status(200).json({
    success: true,
    message: "API Key revoked successfully.",
    data: { identifier: apiKey.keyIdentifier }
  });
});

// Check Key Status
export const checkKeyStatus = asyncHandler(async (req, res) => {
  const activeKey = await ApiKey.findOne({
    user: req.user._id,
    isActive: true
  });

  if (activeKey) {
    return res.status(200).json({
      success: true,
      message: "Active API key found.",
      data: {
        isActive: true,
        identifier: activeKey.keyIdentifier,
        expiresAt: activeKey.expiresAt
      }
    });
  }

  res.status(200).json({
    success: true,
    message: "No active API key.",
    data: { isActive: false }
  });
});
