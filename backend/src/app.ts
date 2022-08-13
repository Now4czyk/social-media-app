import express from "express";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { typeDefs, resolvers } from "./graphql";

dotenv.config();

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
  await mongoose.connect(process.env.MONGO_URI || "");

  app.listen({ port: process.env.PORT }, () => {
    console.log(process.env.PORT);
  });
};

startServer();
