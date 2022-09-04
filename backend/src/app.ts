import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { typeDefs, resolvers } from './graphql';
import { PubSub } from 'graphql-subscriptions';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { createServer } from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { Context } from './utils';

dotenv.config();

const app = express();

const httpServer = createServer(app);
const wsServer = new WebSocketServer({
  server: httpServer,
});
const schema = makeExecutableSchema<Context>({ typeDefs, resolvers });
const pubSub = new PubSub();
const serverCleanup = useServer(
  {
    schema,
    context: () => ({
      pubSub,
    }),
  },
  wsServer
);

const startServer = async () => {
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: true,
    context: async ({ req }) => ({
      req,
      pubSub,
    }),
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();

  server.applyMiddleware({ app });

  await mongoose.connect(process.env.MONGO_URI!);

  httpServer.listen({ port: process.env.PORT }, () => {
    console.log(
      `Server is now running on http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
  });
};

startServer();
