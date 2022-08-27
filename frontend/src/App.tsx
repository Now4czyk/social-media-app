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
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import Authentication from "./pages/Authentication";
import { toast } from "react-toastify";
import { setContext } from "@apollo/client/link/context";
import { Unauthorized } from "./pages/Unauthorized";
import { RouteGuard } from "./utils/routeGuard";
import { NotFound } from "./pages/NotFound";

type customError = {
  message: string;
  id: string;
};

const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    const { message, extensions } = graphQLErrors[0];
    if (extensions.code === "GRAPHQL_VALIDATION_FAILED") {
      console.log("unauthorized");
    }
    console.log("ERROR from App.tsx");
    console.log(message);
    let iterator = 0;
    const errors = [];
    while (extensions[iterator]) {
      errors.push((extensions[iterator] as customError).message);
      iterator++;
    }

    if (errors.length || message) {
      // toast.error(message + " " + errors.join(", "));
      console.log("TOAST MESSAGE", message + " " + errors.join(", "));
    }
    if (networkError) {
      alert(`[Network error]: ${networkError}`);
    }
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

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

const MainRoutes = () => (
  <Routes>
    <Route path="/signin" element={<Authentication />} />
    <Route path="/signup" element={<Authentication />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="/home" element={RouteGuard({ element: <Home /> })} />
    <Route path="/form" element={RouteGuard({ element: <Form /> })} />
    <Route path="/users" element={RouteGuard({ element: <Users /> })} />
    <Route path="/*" element={<Navigate to="not-found" />} />
  </Routes>
);

const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <MainRoutes />
    </Layout>
  </ApolloProvider>
);

export default App;
