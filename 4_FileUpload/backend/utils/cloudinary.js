import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})
console.log(process.env.CLOUDINARY_CLOUD_NAME)
export const uploadFile = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload file to cloudinary
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log(`File uploaded to cloudinary: ${result.secure_url}`);
        // delete file from local
        fs.unlinkSync(localFilePath);
        return result
    } catch (error) {
        console.log("Cloudinary FULL Error:", error);
    if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
    }
    throw new Error("Error uploading file to Cloudinary");
    }
}