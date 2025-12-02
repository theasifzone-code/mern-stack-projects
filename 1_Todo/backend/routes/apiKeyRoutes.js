import express from "express";
import auth from "../middleware/auth.js";
import {
  generateApiKey,
  revokeApiKey,
  checkKeyStatus
} from "../controllers/apiKeyController.js";

const router = express.Router();


router.post("/generate", auth, generateApiKey);
router.delete("/revoke", auth, revokeApiKey);
router.get("/status", auth, checkKeyStatus);

export default router;
