import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 600,
    lineHeight: 1.6818,
    letterSpacing: 0,
    color: theme.colorScheme === 'dark' ? '#e8e8fd' : '#04052f',
    fontSize: 32,
  },

  participants: {
    margin: '24px 0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    fontSize: 14,
  },

  bottom: {
    margin: '16px 0',
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    alignItems: 'center',
  },

  shareButton: {
    padding: 5,
  },

  contentWrapper: {
    display: 'flex',

    '& > #blog-content': {
      width: '100%',

      [theme.fn.largerThan('lg')]: {
        width: '40em',
      },
    },
  },
}))
