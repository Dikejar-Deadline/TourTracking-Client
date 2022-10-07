import { graphQlEndpoint } from "./useGQLQuery";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: graphQlEndpoint,
});

const authMiddleware = new ApolloLink(async (operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem("access_token");
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: typeof token === "string" ? token : null,
    },
  }));

  return forward(operation);
});

export const useApolloConfig = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
