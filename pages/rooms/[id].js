import RoomDetailLayout from '@/components/Layout/RoomDetail/RoomDetail'
import Typography from '@/components/Typography'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GET_ROOM } from 'gql/schema'
import { useGQLQuery } from 'hooks/useGQLQuery'
import { useRouter } from 'next/router'
import React from 'react'


export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["room"], () => fetchData(GET_ROOMS));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function RoomDetail() {
  const router = useRouter()
  const { data: room } = useGQLQuery(["room"], GET_ROOM)

  return (
    <RoomDetailLayout>
      <Typography />
    </RoomDetailLayout>
  )
}

