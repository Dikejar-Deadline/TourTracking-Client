import RoomDetailLayout from '@/components/Layout/RoomDetail/RoomDetail'
import Typography from '@/components/Typography'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GET_ROOM } from 'gql/schema'
import { fetchData, useGQLQuery } from 'hooks/useGQLQuery'
import { useRouter } from 'next/router'
import React from 'react'


export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["room"], () => fetchData(GET_ROOM));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function RoomDetail() {
  const router = useRouter()
  const { id } = router.query
  const { data: room } = useGQLQuery(["room"], GET_ROOM, { roomByIdId: id })

  return (
    <RoomDetailLayout data={room?.roomById}>
      <Typography />
    </RoomDetailLayout>
  )
}

