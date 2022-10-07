import { Button, createStyles, Grid, Highlight, Input, List, Paper, Text, Title } from '@mantine/core'
import { IconSearch } from '@tabler/icons'
import React from 'react'


import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GET_DESTINATIONS } from 'gql/schema'
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
    fontSize: 20,
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
  await queryClient.prefetchQuery(["destinations"], () => fetchData(GET_DESTINATIONS));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Blog() {
  const [searchValue, setSearchValue] = React.useState('')
  const { data: destinations } = useGQLQuery(["destinations"], GET_DESTINATIONS)

  const filteredDestinations = destinations?.destinations?.filter((destination) =>
    destination.name.toLowerCase().includes(searchValue.toLowerCase())
  )

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
          <Highlight highlight={category} className={classes.category} size="xs">
            {category}
          </Highlight>
          <Highlight highlight={title} order={3} className={classes.title}>
            {title}
          </Highlight>
        </div>
        <Button variant="white" color="dark">
          Create Journey
        </Button>
      </Paper>
    );
  }

  return (
    <Layout title='Destinations List'>
      <PageLayout
        title='Destinations List'
        description="Make your own journey and plans your holiday together with new people."
      >
        <Input
          icon={<IconSearch size={15} />}
          placeholder="Search Destinations"
          type='text'
          radius='md'
          aria-label="Search Destinations"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Grid my={60}>
          {!filteredDestinations?.length && (
            <Text sx={{ textAlign: 'center' }} py={48}>
              No destination found.
            </Text>
          )}
          {filteredDestinations?.map((item) => (
            <Grid.Col key={item.id} span={12} md={6}>
              <Card image={item.imgUrl} category={item.name} title={item.description} />
            </Grid.Col>
          ))}
        </Grid>

      </PageLayout>
    </Layout>
  )
}
