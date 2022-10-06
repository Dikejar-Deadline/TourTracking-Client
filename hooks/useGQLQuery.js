import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, request } from "graphql-request";

export const graphQlEndpoint = "http://localhost:4000/";
export const useGQLQuery = (key, query, variables, config = {}) => {
  const headers = {
    headers: {
      authorization: localStorage.getItem("access_token"),
    },
  };

  const graphQLClient = new GraphQLClient(graphQlEndpoint, headers);

  // const fetchData = async () => await graphQLClient.request(query, variables);

  const fetchData = async () =>
    await request(graphQlEndpoint, query, variables);

  return useQuery(key, fetchData, config);
};

export const fetchData = async (query, variables) =>
  await request(graphQlEndpoint, query, variables);
