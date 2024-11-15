import cloudinary from "./cloudinaryConfig.js";
import fs from "fs/promises"; // Use promises for cleaner async code
import createError from "http-errors";

export const uploadImageToCloudinary = async (file) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(file.path, {
      folder: "products",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    });

    // Delete the file from local storage
    await fs.unlink(file.path);

    console.log("The cloudinary response is", result)
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    throw createError(500, "Failed to upload image to Cloudinary");
  }
};
