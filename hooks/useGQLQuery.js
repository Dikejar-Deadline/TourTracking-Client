import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, request } from 'graphql-request';

const endpoint = 'https://7bbc-140-213-150-122.ap.ngrok.io/';
export const useGQLQuery = (key, query, variables, config = {}) => {
  const headers = {
    headers: {
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsYXptaW51dGVzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjY1MDQ3MzkzLCJleHAiOjE2NjUwNTA5OTN9.Rl_125wpQ2XhQ_YCwzOa3soQv6_VwEX0fORxv1MqsP0`
    }
  }

  const graphQLClient = new GraphQLClient(endpoint, headers);

  const fetchData = async () => await graphQLClient.request(query, variables);
  
  // const fetchData = async () => await request(endpoint, query, variables);

  return useQuery(key, fetchData, config);
};

export const fetchData = async (query, variables) => await request(endpoint, query, variables);
