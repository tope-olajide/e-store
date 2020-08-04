import cloudinary from 'cloudinary';
import { AuthenticationError, } from "apollo-server";
const dotenv = require("dotenv");
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });
export default {
    Mutation: {
        saveImageUrl: async (
        parent,
        { uploadedImagesUrl },
        { models: { imageGalleryModel } , user },
        info
      ) => {
        console.log(uploadedImagesUrl)
        if (!user) {
          throw new AuthenticationError("You are not authenticated");
        }
        try {
        const images = uploadedImagesUrl.map((uploaded)=>{
            return {
                userId: user.id,
                imageId: uploaded.imageId,
                imageUrl: uploaded.imageUrl,
                createdAt: Date()
            }
        })
        const galleries = await imageGalleryModel.insertMany(images);
        console.log(galleries);
        
        return galleries;
        } catch (error) {
          throw error;
        }
      },
    deleteImage: async (
        parent,
        { imageId },
        { models: { imageGalleryModel }, user },
        info
      ) => {
        if (!user) {
          throw new AuthenticationError("You are not authenticated");
        }
        try {
          const deletedImage = await imageGalleryModel.findOneAndDelete({
            _id: imageId,
            userId: user.id,
          });
          if (!deletedImage) {
            throw new Error("404 Image not found");
          }
          console.log(deletedImage)
          cloudinary.v2.uploader.destroy(deletedImage.imageId, (error, result) => {
            console.log(result, error);
          });
          return {isImageDeleted:true};
        } catch (error) {
          return {isImageDeleted:false};
        }
      },
    },
    Query: {
        fetchUserGallery: async (
          parent,
          { data },
          { models: { imageGalleryModel }, user },
          info
        ) => {
          try {
            const galleries = await imageGalleryModel.find({userId: user.id});
            if (galleries.length) {
return galleries
              };
              throw new Error("404 No Pitures found");
            }
           catch (error) {
            throw error;
          }
        },
  }}
