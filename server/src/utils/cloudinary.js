import { v2 as cloudinary } from 'cloudinary';
import fs from "fs-extra";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No file path provided for upload.");
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        console.log("File uploaded successfully to Cloudinary:", response.url);
        fs.unlinkSync(localFilePath); // Delete local file after successful upload
        return response;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        fs.unlinkSync(localFilePath); // Delete local file if upload fails
        return null;
    }
};

export default uploadOnCloudinary;
