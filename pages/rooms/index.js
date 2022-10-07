import { Button, createStyles, Grid, Input, List, Paper, Text, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import React from 'react'


import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import { CardGrid } from '@/components/CardGrid'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GET_ROOMS } from 'gql/schema'
import { useGQLQuery } from 'hooks/useGQLQuery'
// import PostsList from '@/components/PostsList' 

const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

export async function getServerSideProps() {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["rooms"], () => fetchData(GET_ROOMS));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Blog() {
  const [searchValue, setSearchValue] = React.useState('')
  const { data: rooms } = useGQLQuery(["rooms"], () => GET_ROOMS)

  const filteredRooms = rooms?.rooms?.filter((room) =>
    room?.Destination?.name.toLowerCase().includes(searchValue.toLowerCase())
  )

  console.log(filteredRooms)

  function Card({ image, title, category }) {
    const { classes } = useStyles();

    return (
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${image})` }}
        className={classes.card}
      >
        <div>
          <Text className={classes.category} size="xs">
            {category}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
        <Button variant="white" color="dark">
          Create Journey
        </Button>
      </Paper>
    );
  }

  return (
    <Layout title='Rooms List'>
      <PageLayout
        title='Rooms List'
        description="Join with people and go have fun with them!"
      >
        <Input
          icon={<IconSearch size={15} />}
          placeholder="Search Rooms"
          type='text'
          radius='md'
          aria-label="Search Rooms"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Grid my={60}>
          {filteredRooms.map(room => (
            <Grid.Col span={12} md={6} key={room?.id}>
              <CardGrid data={room} />
            </Grid.Col>
          ))}
        </Grid>

      </PageLayout>
    </Layout>
  )
}
