import { graphQlEndpoint } from "./useGQLQuery";
import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { useLocalStorage } from "@mantine/hooks";

// const endpoint = 'https://16e5-140-213-150-122.ap.ngrok.io/';
const endpoint = 'https://6db6-125-166-126-165.ap.ngrok.io/';


const httpLink = new HttpLink({
  uri: endpoint,
});

const authMiddleware = new ApolloLink(async (operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
    },
  }));

  return forward(operation);
});

export const useApolloConfig = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
