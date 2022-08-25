import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  createHttpLink,
} from "@apollo/client";
import { onError, ErrorResponse } from "@apollo/client/link/error";
import { Users, Form, Home } from "./pages";
import { Navigate, useRoutes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Authentication from "./pages/Authentication";
import { toast } from "react-toastify";
import { setContext } from "@apollo/client/link/context";

type customError = {
  message: string;
  id: string;
};

const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    const { message, extensions } = graphQLErrors[0];
    console.log("ERROR from App.tsx");
    console.log(message);
    let iterator = 0;
    const errors = [];
    while (extensions[iterator]) {
      errors.push((extensions[iterator] as customError).message);
      iterator++;
    }

    if (errors.length || message) {
      toast.error(message + " " + errors.join(", "));
    }
    if (networkError) {
      alert(`[Network error]: ${networkError}`);
    }
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  console.log("token APP.TSX");
  console.log(token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "Bearer fake",
    },
  };
});

const link = from([
  errorLink,
  new HttpLink({ uri: "http://localhost:8080/graphql" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});

const MainRoutes = () =>
  useRoutes([
    { path: "/signin", element: <Authentication /> },
    { path: "/signup", element: <Authentication /> },
    { path: "/home", element: <Home /> },
    { path: "/form", element: <Form /> },
    { path: "/users", element: <Users /> },
    { path: "*", element: <Navigate to="/home" replace /> },
  ]);

const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <MainRoutes />
    </Layout>
  </ApolloProvider>
);

export default App;
