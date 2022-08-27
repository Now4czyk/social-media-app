import { ErrorResponse, onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, from, HttpLink, InMemoryCache } from "@apollo/client";

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

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link),
});
