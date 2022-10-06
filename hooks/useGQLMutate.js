import { useMutation } from "@tanstack/react-query"
import { GraphQLClient, request } from 'graphql-request';

const endpoint = 'https://7bbc-140-213-150-122.ap.ngrok.io/';

export const useGQLMutate = (query, variables) => {
  const headers = {
    headers: {
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsYXptaW51dGVzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjY1MDYwNTE3LCJleHAiOjE2NjUwNjQxMTd9.-bp9AqVbTBtjAszBGMuNXAKJz8wyVNnSqLL5JwOo-QU`
    }
  }
  const graphQLClient = new GraphQLClient(endpoint, headers);

  return useMutation(() => graphQLClient.request(
    query,
    variables,
  ))
}
