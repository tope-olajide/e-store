import { AuthenticationError, UserInputError, error } from "apollo-server";
import validator from 'validator';

export default {
  Mutation: {
    createProduct: async (
      parent,
      { data },
      { models: { productModel }, user },
      info
    ) => {
      
      if (!user) {
        throw new AuthenticationError("Your session has expired. Please Login Again!")
      }
      try {
        if (data.name.length < 5) {
          throw new UserInputError("Product name must have atleast 5 characters");
        }
        if (data.name.summary < 10) {
          throw new UserInputError("Product summary must have atleast 10 characters");
        }
        if (data.description.length < 20) {
          throw new UserInputError("Product description must have atleast 20 characters");
        }
        const createdProduct = await productModel.create({
          ...data,
          createdAt: Date(),
          modifiedAt: Date(),
          userId: user.id,
        });
        return createdProduct;
      } catch (error) {
        throw error;
      }
    },
    modifyProduct: async (
      parent,
      { productId, data },
      { models: { productModel }, user },
      info
    ) => {
      try {
        console.log(data)
        if (!validator.isLength(data.name), {min:5}) {
          throw new UserInputError("Product name must be atleast 5 characters");
        }
        if (!validator.isLength(data.summary), {min:10}) {
          throw new UserInputError("Product summary must be atleast 10 characters");
        }
        if (!validator.isLength(data.description), {min:20}) {
          throw new UserInputError("Product description must be atleast 20 characters");
        }
        if (!user) {
          throw new AuthenticationError("You are not authenticated");
        }
        const modifiedProduct = await productModel.findOneAndUpdate(
          {
            _id: productId,
          },
          { ...data, modifiedAt: Date() },
          {
            runValidators: true,
            new: true,
          }
        );
        return modifiedProduct;
      } catch (error) {
        throw error;
      }
    },
    deleteMyProduct: async (
      parent,
      { productId },
      { models: { productModel }, user },
      info
    ) => {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      try {
        const deletedProduct = await productModel.findOneAndDelete({
          _id: productId,
          userId: user.id,
        });
        if (!deletedProduct) {
          throw new Error("404 Post not found");
        }
        return deletedProduct;
      } catch (error) {
        throw error;
      }
    },
  },
  Query: {
    allProducts: async (
      parent,
      { data },
      { models: { productModel,favoriteModel }, user },
      info
    ) => {
      try {
        const products = await productModel.find({});
        const favoriteProduct = await favoriteModel.find({});
        if (products) {
          const favoriteProductIds = favoriteProduct.map((product) => {
            return product.productId.toString();
          });
          console.log(favoriteProductIds);
          const allProducts = products.map((product) => {
            if (favoriteProductIds.includes(product._id.toString())) {
              return { product, isUserFavorite: true };
            }
            return { product, isUserFavorite: false };
          });
          console.log(allProducts[0]);
          return allProducts;
        }
        return [{}];
      } catch (error) {
        throw error;
      }
    },
    productDetails: async (
      parent,
      { productId },
      { models: { productModel }, user },
      info
    ) => {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      try {
        const productDetails = await productModel.findOne({ _id: productId });
        if (productDetails) {
          return productDetails;
        }
        return {};
      } catch (error) {
        throw error;
      }
    }
  }
};
