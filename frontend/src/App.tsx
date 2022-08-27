import React from "react";
import { ApolloProvider } from "@apollo/client";
import { Layout } from "./components/Layout/Layout";
import { client } from "./graphql/client";
import { MainRoutes } from "./routes/routes";

const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <MainRoutes />
    </Layout>
  </ApolloProvider>
);

export default App;
