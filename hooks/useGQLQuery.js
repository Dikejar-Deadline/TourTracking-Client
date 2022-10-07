import { useQuery } from '@tanstack/react-query';
import { GraphQLClient, request } from 'graphql-request';
import { useLocalStorage } from '@mantine/hooks';

// const endpoint = 'https://16e5-140-213-150-122.ap.ngrok.io/';
const endpoint = 'https://6db6-125-166-126-165.ap.ngrok.io/';

export const graphQlEndpoint = "http://localhost:4000/";

export const useGQLQuery = (key, query, variables, config = {}) => {
  const [token, setToken] = useLocalStorage({ key: 'access_token' });
  const headers = {
    headers: {
      authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJsYXptaW51dGVzQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjY1MTExOTA5LCJleHAiOjE2NjUxMTU1MDl9.-8VWVDokfHKlmgLl1r65BQmlJgJ9v7YyN6CssxsmNJg`
      // authorization: {token}
    }
  }

  const graphQLClient = new GraphQLClient(endpoint, headers);

  // const fetchData = async () => await graphQLClient.request(query, variables);

  const fetchData = async () =>
    await request(endpoint, query, variables);


  return useQuery(key, fetchData, config);
};

export const fetchData = async (query, variables) =>
  await request(endpoint, query, variables);
