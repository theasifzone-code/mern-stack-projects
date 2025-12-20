import mongoose from "mongoose";

const fileUploadSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: true,
    }
},{timestamps:true});


export const FileUpload = mongoose.model("FileUpload", fileUploadSchema);
