import express from "express";
import { uploadFile, getAllFiles } from "../controllers/fileUpload.controller.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

router.post("/upload", upload.single("file"), uploadFile);
router.get("/files", getAllFiles);

export default router;