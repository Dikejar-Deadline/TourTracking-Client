import Layout from '@/components/Layout'
import ScrollTopAndChat from '@/components/ScrollTopAndChat'
import { Avatar, Box, Button, Divider, Group, Title, Tooltip, useMantineColorScheme } from '@mantine/core'
import formatDate from 'lib/formatDate'
import React from 'react'
import { useStyles } from '@/components/Layout/RoomDetail/RoomDetail.styles'
import Chat from '@/components/Chat'

const avatars = [
  'https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
];

export default function RoomDetailLayout({ children }) {
  const ISOPublishedTime = new Date().toISOString()
  const { classes } = useStyles()

  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const handlePayment = (e) => {
    e.preventDefault
    let token = "1f0840c8-e50c-4967-bbda-1d0b0d1ca99f"
    snap.pay(token, {
      onSuccess: function(result) {
        console.log("SUCCESS", result);
        alert("Payment accepted \r\n"+JSON.stringify(result));
      },
      onPending: function(result) {
        console.log("Payment pending", result);
        alert("Payment pending \r\n"+JSON.stringify(result));
      },
      onError: function() {
        console.log("Payment error");
      }
    })
  }

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
        Room Title By
      </Title>
      <div className={classes.participants}>
        Participants : 3 / 5
        <Tooltip.Group openDelay={300} closeDelay={100}>
          <Group position='center' spacing="xs" >
            <Tooltip
              label="Lazarus"
              openDelay={500}
              withArrow
            >
              <Avatar src={null} radius="xl" color="blue">L</Avatar>
            </Tooltip>
            <Tooltip
              label="Linda"
              openDelay={500}
              withArrow
            >
              <Avatar src={null} radius="xl" color="blue">L</Avatar>
            </Tooltip>
            <Tooltip
              label="Ardi"
              openDelay={500}
              withArrow
            >
              <Avatar src={null} radius="xl" color="blue">AP</Avatar>
            </Tooltip>
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
            component='a'
            target='_blank'
            variant='outline'
            rel='noopener noreferrer'
            href="#"
            className={classes.shareButton}
          >
            Join
          </Button>
        </div>
      </div>
      <Divider />
      <Box mt={32}>
        <article id='blog-content'>
          <p>lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem </p>
        </article>
      </Box>
      <Divider mb={32} />
      <Chat />
      <ScrollTopAndChat />
    </Layout>
  )
}
