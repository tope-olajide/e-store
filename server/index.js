import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';

import userModel from './models/user';
import productModel from './models/product';
import favoriteModel from './models/favorite';

const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(cors());

const getUser = (req) => {
    const token = req.headers['token'];
  
    if (token) {
      try {
        return jwt.verify(token, process.env.JWT_SECRET);
        
      } catch (e) {
        console.log(error)
        throw new AuthenticationError('Your session expired. Sign in again.');
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
            favoriteModel
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