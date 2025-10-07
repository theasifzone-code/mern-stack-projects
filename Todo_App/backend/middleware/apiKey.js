import ApiKey from "../models/apiKeyModel.js";

const apikeyAuth = async (req, res, next) => {
  try {
    const apiKeyValue = req.apiKeyValue; // 👈 auth middleware se aaya

    if (!apiKeyValue) {
      return res.status(401).json({
        success: false,
        message: "API key value is missing.",
      });
    }

    // Step 1: Active key find karo
    const keyDoc = await ApiKey.findOne({ isActive: true })
      .select("+keyHash")
      .populate("user");

    if (!keyDoc) {
      return res.status(403).json({ success: false, message: "Invalid API key" });
    }

    // Step 2: Verify plain key with hash
    const isKeyValid = await keyDoc.verifyKey(apiKeyValue);
    if (!isKeyValid) {
      return res.status(403).json({ success: false, message: "Invalid API key" });
    }

    // Step 3: Update lastUsedAt (non-blocking)
    keyDoc.lastUsedAt = new Date();
    keyDoc.save().catch((err) =>
      console.error("Error updating lastUsedAt:", err)
    );

    // Step 4: Attach info to request
    req.apiKey = keyDoc; // full API key doc
    req.apiUser = keyDoc.user; // API key owner user

    next();
  } catch (error) {
    console.error("API Key Auth Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during API key verification.",
    });
  }
};

export default apikeyAuth;
