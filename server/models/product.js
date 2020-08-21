import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  category: [String],
  modifiedAt: {
    type: Date,
  },
  productImageUrl: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
});
export default mongoose.model('Products', productSchema);
