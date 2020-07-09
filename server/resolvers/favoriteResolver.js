export default {
    Mutation: {
        addProductToFavorite: async (
        parent,
        { productId },
        {  models: { favoriteModel } , user },
        info
      ) => {
        if (!user) {
          throw new AuthenticationError("You are not authenticated");
        }
        try {
          const favProduct = await favoriteModel.findOne({ productId, userId:user.id });
          console.log(favProduct);
          if (favProduct) {
            throw new Error("Product already added to favorite");
          }
          const createdFavorite = await favoriteModel.create({
            productId,
            userId: user.id,
          });
          console.log(createdFavorite);
          return createdFavorite;
        } catch (error) {
          throw error;
        }
      },
      removeProductFromFavorite: async (
        parent,
        { productId },
        { models: { favoriteModel }, user },
        info
      ) => {
        if (!user) {
          throw new AuthenticationError("You are not authenticated");
        }
        try {
          const deletedProduct = await favoriteModel.findOneAndDelete({ productId, userId: user.id });
      if (!deletedProduct) {
        throw new Error("404 Product not found");
      }
      return deletedProduct;
        } catch (error) {
          throw error;
        }
      },
    },
  }
