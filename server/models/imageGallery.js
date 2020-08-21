import mongoose from "mongoose";

const { Schema } = mongoose;

const imageGallerySchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  imageId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});
export default mongoose.model("ImageGallery", imageGallerySchema);
