import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, request } from 'graphql-request';

const endpoint = 'https://7bbc-140-213-150-122.ap.ngrok.io/';
export const useGQLQuery = (key, query, variables, config = {}) => {
  const headers = {
    headers: {
      authorization: `token`
    }
  }

  const graphQLClient = new GraphQLClient(endpoint, headers);

  // const fetchData = async () => await graphQLClient.request(query, variables);
  
  const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};

export const fetchData = async (query, variables) => await request(endpoint, query, variables);
