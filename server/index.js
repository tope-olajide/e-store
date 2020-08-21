import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jsonwebtoken from 'jsonwebtoken'
import schemas from './schemas';
import resolvers from './resolvers';
import userModel from './models/user';
import productModel from './models/product';
import favoriteModel from './models/favorite';
import imageGalleryModel from './models/imageGallery';

const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());

const getUser = (req) => {
    const token = req.headers['authorization'];
    
      if (token) {
        try {
          return jsonwebtoken.verify(token, process.env.JWT_SECRET);
        } catch (error) {
          console.log(error)
          return null
        }
      }
  };
  
const server = new ApolloServer({
    typeDefs: schemas,
    resolvers,
    context: ({ req }) => {
      if (req) {
        const user = getUser(req);
        
        return {
          user,
          models: {
            userModel,
            productModel,
            favoriteModel,
            imageGalleryModel
          },
        };
      }
    },
  });
const options = {useNewUrlParser: true, useUnifiedTopology: true}
server.applyMiddleware({ app, path: '/graphql' });

mongoose.connect(process.env.DATABASE_URL, options)
        .then(() => app.listen(5000, console.log('🚀 Server is up and running at http://localhost:5000')))
        .catch(error => { throw error })