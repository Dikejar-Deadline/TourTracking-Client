import Layout from '@/components/Layout'
import ScrollTopAndChat from '@/components/ScrollTopAndChat'
import { Avatar, Box, Button, Divider, Group, Title, Tooltip, useMantineColorScheme } from '@mantine/core'
import formatDate from 'lib/formatDate'
import React from 'react'
import { useStyles } from '@/components/Layout/RoomDetail/RoomDetail.styles'
import Chat from '@/components/Chat'
import { useGQLMutate } from 'hooks/useGQLMutate'
import { JOIN_ROOM } from 'gql/schema/rooms'
import { useRouter } from 'next/router'
const dayjs = require('dayjs')

const avatars = [
  'https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
];

export default function RoomDetailLayout({ data, children }) {
  const router = useRouter()
  const { id } = router.query

  const ISOPublishedTime = data?.schedule ? new Date(data?.schedule).toISOString() : null
  const { classes } = useStyles()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const handlePayment = (e) => {
    e.preventDefault
    let token = "1f0840c8-e50c-4967-bbda-1d0b0d1ca99f"
    snap.pay(token, {
      onSuccess: function (result) {
        console.log("SUCCESS", result);
        alert("Payment accepted \r\n" + JSON.stringify(result));
      },
      onPending: function (result) {
        console.log("Payment pending", result);
        alert("Payment pending \r\n" + JSON.stringify(result));
      },
      onError: function () {
        console.log("Payment error");
      }
    })
  }

  const { mutate: join, error } = useGQLMutate(JOIN_ROOM, { "joinRoomId": id }, ['join'])

  const handleJoin = (e) => {
    e.preventDefault()
    join()
  }
  console.log(error)
  return (
    <Layout
      title="Room Detail"
      description="Room Detail"
    >
      <ScrollTopAndChat />
      <time dateTime={ISOPublishedTime}>
        {formatDate(new Date(ISOPublishedTime), "en")}
      </time>
      <Title order={1} mb={16}>
        {data?.Destination.name}
      </Title>
      <div className={classes.participants}>
        Participants : {data?.Participants.length} {' / '} {data?.maxParticipant}
        <Tooltip.Group openDelay={300} closeDelay={100}>
          <Group position='center' spacing="xs" >
            {data?.Participants.map(participant => (
              <Tooltip
                label={participant?.username}
                openDelay={500}
                withArrow
                key={participant?.id}
              >
                <Avatar src={null} radius="xl" color="blue">L</Avatar>
              </Tooltip>
            ))}
          </Group>
        </Tooltip.Group>
      </div>
      <Divider />
      <div className={classes.bottom}>
        <div>
          <Button
            component='a'
            variant='outline'
            rel='noopener noreferrer'
            className={classes.shareButton}
            onClick={(e) => handlePayment(e)}
          >
            Detail Payment
          </Button>
        </div>
        <div>
          <Button
            rel='noopener noreferrer'
            className={classes.shareButton}
            onClick={(e) => handleJoin(e)}
          >
            Join
          </Button>
        </div>
      </div>
      <Divider />
      <Box mt={32}>
        <article id='blog-content'>
          <p>{data?.Destination.description}</p>
        </article>
      </Box>
      <Divider mb={32} />
      <Chat />
      <ScrollTopAndChat />
    </Layout>
  )
}
