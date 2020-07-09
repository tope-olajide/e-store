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
    Query: {
      fetchAllFavoriteProduct: async (
      parent,
      { data },
      { models: { favoriteModel,productModel }, user },
      info
    ) => {
      if (!user) {
        throw new AuthenticationError("You are not authenticated");
      }
      try {
        const favoriteProducts = await favoriteModel.find({userId: user.id});
        if (favoriteProducts) {
        const favoriteProductsIds = favoriteProducts.map((products)=>{
            return products.productId
        })
        console.log(favoriteProductsIds)
        const records = await productModel.find().where('_id').in(favoriteProductsIds).exec();
        console.log(records)
        return records
        }
        return []
      } catch (error) {
        throw error;
      }
    },
    
  }
  }
