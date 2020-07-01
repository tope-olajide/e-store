import mongoose from 'mongoose';

const { Schema } = mongoose;

const favouriteProductSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});
export default mongoose.model('FavouriteProduct', favouriteProductSchema);
