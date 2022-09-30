import { Anchor, Box, Divider, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'

import { useStyles } from './Fouter.styles'
import { links } from './/links'
import Link from '../Link'

export default function Footer() {
  const { locale, defaultLocale } = useRouter()
  const { classes } = useStyles()
  const { colorScheme } = useMantineTheme()
  const dark = colorScheme === 'dark'

  return (
    <footer className={classes.footer}>
      <Divider my='xl' />
      <div className={classes.footerInner}>
        <Box
          pb={64}
          sx={(theme) => ({
            display: 'grid',
            gap: 16,
            width: '100%',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            [theme.fn.largerThan('sm')]: {
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            },
          })}
        >
          {links.middleLinks.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 16,
                  marginBottom: 40,
                  paddingRight: 16,
                }}
              >
                {item.list.map((item, index) => {
                  if (item.href === '/feed.xml') {
                    return (
                      <Anchor
                        key={index}
                        href={`/feed${
                          locale === defaultLocale ? '' : `.${locale}`
                        }.xml`}
                        sx={{
                          color: dark ? '#C1C2C5' : '#1f2937',
                          ...(dark && {
                            '&:hover': {
                              color: 'white',
                            },
                          }),
                        }}
                      >
                        {item.title}
                      </Anchor>
                    )
                  }

                  return (
                    <Link
                      key={index}
                      href={item.href}
                      sx={{
                        color: dark ? '#C1C2C5' : '#1f2937',
                        ...(dark && {
                          '&:hover': {
                            color: 'white',
                          },
                        }),
                      }}
                    >
                      {item.title}
                    </Link>
                  )
                })}
              </Box>
            )
          })}
        </Box>
      </div>
      <div className={classes.footerBottom}>
        © {new Date().getFullYear()}
        {' TourTracking'}
      </div>
    </footer>
  )
}
