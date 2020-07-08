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
    },
  }
