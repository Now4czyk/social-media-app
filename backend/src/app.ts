import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './graphql';

dotenv.config();

const app = express();

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
    context: async ({ req }) => ({
      req,
    }),
    // plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  //starting server
  await server.start();
  //utils

  //starting graphQL API
  server.applyMiddleware({ app, path: '/graphql' });
  //connecting graphQL API
  await mongoose.connect(process.env.MONGO_URI!);

  app.listen({ port: process.env.PORT }, () => {
    console.log(process.env.PORT);
  });
};

startServer();
