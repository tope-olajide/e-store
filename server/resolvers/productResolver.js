import { AuthenticationError } from "apollo-server";

export default {
  Mutation: {
    createProduct: async (
      parent,
      { data },
      { models: { productModel }, user },
      info
    ) => {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      try {
        console.log(data, user);
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
