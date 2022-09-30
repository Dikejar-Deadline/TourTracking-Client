import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
} from '@mantine/core';
import image from '../../public/static/TourTracking.png';
const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: "#1971C2",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

export function HeroBullets() {
  const { classes } = useStyles();
  return (
    <div>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
            Vacation, <span className={classes.highlight}>Make Friends</span> and Healing
            </Title>
            <Text color="dimmed" mt="md">
            Go beyond your social circle and connect with people near and far. TourTracking is all about making honest connections online and in real life to Vacation Together.
            </Text>


            <Group mt={30}>
              <Button radius="xl" size="md" className={classes.control}>
                Create a Journey
              </Button>
              <Button variant="default" radius="xl" size="md" className={classes.control}>
                Vacation with people
              </Button>
            </Group>
          </div>
          <Image src={image.src} className={classes.image} width={250} />
        </div>
      </Container>
    </div>
  );
}
