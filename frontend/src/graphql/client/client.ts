import { ErrorResponse, onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { auth, CustomError } from "../../utils";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:8080/graphql",
  })
);

const httpLink = new HttpLink({
  uri: "http://localhost:8080/graphql",
});

const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    const { message, extensions } = graphQLErrors[0];
    if (extensions.code === "GRAPHQL_VALIDATION_FAILED") {
      console.log("unauthorized");
      auth.logout();
    }
    console.log("ERROR from App.tsx");
    console.log(message);
    let iterator = 0;
    const errors = [];
    while (extensions[iterator]) {
      errors.push((extensions[iterator] as CustomError).message);
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
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  ),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});
