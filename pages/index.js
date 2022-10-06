import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Box, Button, Divider, Title } from "@mantine/core";
import { CardsCarousel } from "@/components/Carousel/Carousel";
import { FeaturesCards } from "@/components/Features/Features";
import { HeroBullets } from "@/components/Hero";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons";
import Link from "@/components/Link";
import { useHover } from "@mantine/hooks";
import { CarousalJourney } from "@/components/CarouselJourney";
import { fetchData, useGQLQuery } from "hooks/useGQLQuery";
import { GET_DESTINATIONS, GET_ROOMS } from "gql/schema";

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["destinations"], () =>
    fetchData(GET_DESTINATIONS)
  );
  await queryClient.prefetchQuery(["rooms"], () => fetchData(GET_ROOMS));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { hovered, ref } = useHover();

  const { data: destinations } = useGQLQuery(
    ["destinations"],
    GET_DESTINATIONS
  );
  const { data: rooms } = useGQLQuery(["rooms"], () => GET_ROOMS);
  return (
    <Layout>
      <div>
        <HeroBullets />
        <FeaturesCards />
        <Title order={2} color="#1971C2">
          Vacation with People
        </Title>
      </div>
      <Divider my="xl" />
      <CardsCarousel data={rooms.rooms} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          component={Link}
          ref={ref}
          href="/rooms"
          rightIcon={
            <motion.div animate={{ x: hovered ? 5 : 0 }}>
              <IconArrowRight size={20} />
            </motion.div>
          }
          noIcon
          underline={false}
        >
          All Rooms
        </Button>
      </Box>
      <Title order={2} color="#1971C2" mt={70}>
        Create Your Own Journey
      </Title>
      <Divider my="xl" />
      <CarousalJourney data={destinations.destinations} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          component={Link}
          ref={ref}
          href="/destinations"
          rightIcon={
            <motion.div animate={{ x: hovered ? 5 : 0 }}>
              <IconArrowRight size={20} />
            </motion.div>
          }
          noIcon
          underline={false}
        >
          All Destinations
        </Button>
      </Box>
    </Layout>
  );
}
