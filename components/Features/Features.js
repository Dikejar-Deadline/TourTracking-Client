import {
  createStyles,
  Text,
  Card,
  SimpleGrid,
  Container,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons';

const mockdata = [
  {
    title: 'Extreme performance',
    description:
      'This dust is a',
    icon: IconGauge,
  },
  {
    title: 'Privacy focused',
    description:
      'People say it ',
    icon: IconUser,
  },
  {
    title: 'No third parties',
    description:
      'They’re popular, ',
    icon: IconCookie,
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
  },

  cardTitle: {
    '&::after': {
      content: '""',
      display: 'block',
      backgroundColor: "#9C36B5",
      width: 45,
      height: 2,
      marginTop: theme.spacing.sm,
    },
  },
}));

export function FeaturesCards() {
  const { classes, theme } = useStyles();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));
  return (
    <Container size="lg">
      <SimpleGrid cols={3} spacing="xl" my={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
