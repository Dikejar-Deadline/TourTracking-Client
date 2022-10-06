import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GraphQLClient, request } from 'graphql-request';
import { useRouter } from "next/router";

const endpoint = 'https://7bbc-140-213-150-122.ap.ngrok.io/';

const access_token = localStorage.getItem("access_token")

export const useGQLMutate = (query, variables, key) => {
  const router = useRouter()

  const queryClient = useQueryClient()
  const headers = {
    headers: {
      authorization: `${access_token ? access_token : null}`
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
