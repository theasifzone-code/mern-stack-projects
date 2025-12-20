import { FileUpload } from "../models/fileUpload.model.js";
import { uploadFile as cloudinaryUpload} from "../utils/cloudinary.js";

// upload file
export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const cloudinaryResult = await cloudinaryUpload(req.file.path);
        if (!cloudinaryResult) {
            return res.status(500).json({ error: "Error uploading file to Cloudinary" });
        }
        const file = await FileUpload.create({
            fileUrl: cloudinaryResult.secure_url,
        });

        res.status(200).json({
            message: "File uploaded successfully",
            file,
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get all files
export const getAllFiles = async (req, res) => {
    try {
        const files = await FileUpload.find({});
        res.status(200).json({
            message: "Files fetched successfully",
            files,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// delete file
export const deleteFile = async (req, res) => {
    try {
        const file = await FileUpload.findByIdAndDelete(req.params.id);
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }
        if (file.fileUrl) {
            await cloudinary.uploader.destroy(file.fileUrl.split("/").pop().split(".")[0]);
        }
    } catch (error) {
        
    }
}