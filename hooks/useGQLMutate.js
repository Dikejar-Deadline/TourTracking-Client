import { useLocalStorage } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GraphQLClient, request } from 'graphql-request';
import { useRouter } from "next/router";

const endpoint = 'https://16e5-140-213-150-122.ap.ngrok.io/';


export const useGQLMutate = (query, variables, key) => {
  const [token, setToken] = useLocalStorage({ key: 'access_token' });

  const router = useRouter()

  const queryClient = useQueryClient()
  const headers = {
    headers: {
      authorization: `${token ? token : null}`
    }
  }
  const graphQLClient = new GraphQLClient(endpoint, headers);

  return useMutation(() => graphQLClient.request(
    query,
    variables,
  ), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(key)
      const { login } = data
      if (login) {
        localStorage.setItem("access_token", login.access_token)
      }
      router.push('/')
    }
  })
}
