import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

dotenv.config();

const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // csrfPrevention: true,
    // cache: 'bounded',
    // context: ({ req }) => {
    //   const token = req.headers.authorization || '';
    //
    //   // Try to retrieve a user with the token
    //   const decodedToken = jwt.verify(token, process.env.JWT_KEY!);
    //
    //   // Add the user to the context
    //   return { user };
    // },
    // plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  //starting server
  await server.start();
  //authentication

  //starting graphQL API
  server.applyMiddleware({ app, path: '/graphql' });
  //connecting graphQL API
  await mongoose.connect(process.env.MONGO_URI!);

  app.listen({ port: process.env.PORT }, () => {
    console.log(process.env.PORT);
  });
};

startServer();
