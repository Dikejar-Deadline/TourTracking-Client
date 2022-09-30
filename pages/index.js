import { Box, Button, Divider, Title } from "@mantine/core";
import { CardGrid } from "../components/CardGrid/CardGrid";
import { CardsCarousel } from "../components/Carousel/Carousel";
import { FeaturesCards } from "../components/Features/Features";
import { HeroBullets } from "../components/Hero";
import Layout from "../components/Layout";
import { motion } from 'framer-motion'
import { IconArrowRight } from "@tabler/icons";
import Link from '../components/Link'
import { useHover } from "@mantine/hooks";
import { CarousalJourney } from "../components/CarouselJourney/CarouselJourney";

export default function Home() {
  const { hovered, ref } = useHover()

  return (
    <Layout>
      <div>
        <HeroBullets />
        <FeaturesCards />
        <Title order={2} color="#1971C2">Vacation with People</Title>
      </div>
      <Divider my='xl' />
      <CardsCarousel />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          component={Link}
          ref={ref}
          href='/blog'
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
      <Title order={2} color="#1971C2" mt={70}>Create Your Own Journey</Title>
      <Divider my='xl' />
      <CarousalJourney />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          component={Link}
          ref={ref}
          href='/blog'
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
  )
}
