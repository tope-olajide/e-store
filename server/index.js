import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
const dotenv = require("dotenv");
const app = express();
app.use(cors());
const server = new ApolloServer();
const options = {useNewUrlParser: true, useUnifiedTopology: true}
server.applyMiddleware({ app, path: '/graphql' });

mongoose.connect(process.env.DATABASE_URL, options)
        .then(() => app.listen(3000, console.log('🚀 Server ready at http://localhost:3000')))
        .catch(error => { throw error })