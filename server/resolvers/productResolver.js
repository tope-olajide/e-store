import { AuthenticationError, UserInputError } from "apollo-server";
import validator from 'validator';

export default {
  Mutation: {
    createProduct: async (
      parent,
      { data },
      { models: { productModel }, user },
      info
    ) => {
      try {
        if (!validator.isLength(data.name), {min:5}) {
          throw new UserInputError("Product name must be atleast 5 characters");
        }
        if (!validator.isLength(data.summary), {min:10}) {
          throw new UserInputError("Product summary must be atleast 10 characters");
        }
        if (!validator.isLength(data.description), {min:20}) {
          throw new UserInputError("Product description must be atleast 20 characters");
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
  },
};
