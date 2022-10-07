import {
  Button,
  createStyles,
  Grid,
  Input,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { useCallback, useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageLayout from "@/components/Layout/PageLayout";
import { GET_DESTINATIONS } from "gql/schema";
import { useRouter } from "next/router";
import debounce from "lodash.debounce";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_DESTINATON } from "gql/schema/destinations";


const useStyles = createStyles((theme) => ({
  card: {
    height: 440,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
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
    textTransform: "uppercase",
  },
}));

export default function DestinationIndex() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { loading, error, data } = useQuery(GET_DESTINATIONS);
  const [
    deleteDestination,
    { data: deteleData, loading: loadingData, error: errorData },
  ] = useMutation(DELETE_DESTINATON, {
    refetchQueries: [{ query: GET_DESTINATIONS }],
  });

  const filterDestination = () => {
    if (searchValue) {
      setFiltered(
        data?.destinations.filter(({ name }) => {
          return name.toLowerCase().search(searchValue) == 0;
        })
      );
    } else {
      setFiltered(data?.destinations);
    }
  };

  const changeHandler = (event) => {
    setSearchValue(event.target.value);
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  useEffect(() => {
    if (data) filterDestination();
  }, [data, searchValue]);

  function Card({ id, name, imgUrl, description }) {

    const { classes } = useStyles();

    return (
      <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `url(${imgUrl})` }}
        className={classes.card}
      >
        <div>
          <Text className={classes.category} size="xs">
            {name}
          </Text>
          <Title order={3} className={classes.title}>
            {description.slice(0, 50)}...
          </Title>

        </div>
        <Button
          variant="white"
          color="dark"
          onClick={() => {
            router.push({
              pathname: "/destinations/destinationById",
              query: { id },
            });
          }}
        >
          Create Journey
        </Button>
        <button
          onClick={() => {
            router.push({
              pathname: "/destinations/edit",
              query: { id },
            });
          }}
        >
          Edit destination
        </button>
        <button
          onClick={() => {
            deleteDestination({
              variables: { deleteDestinationId: id },
            });
          }}
        >
          Delete destination
        </button>
      </Paper>
    );
  }

  return (
    <Layout title="Destinations List">
      <PageLayout
        title="Destinations List"
        description="Make your own journey and plans your holiday together with new people."
      >
        <button
          onClick={() => {
            router.push({
              pathname: "destinations/create",
            });
          }}
        >
          Create destination
        </button>

        <Input
          icon={<IconSearch size={15} />}
          placeholder="Search Destinations"
          type="text"
          radius="md"
          aria-label="Search Destinations"
          onChange={debouncedChangeHandler}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Grid my={60}>
            {filtered.map((item, index) => {
              return (
                <Grid.Col key={index.toString()} span={12} md={6}>
                  <Card {...item} />
                </Grid.Col>
              );
            })}
          </Grid>
        )}
      </PageLayout>
    </Layout>
  );
}
