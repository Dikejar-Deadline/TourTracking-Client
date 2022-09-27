import { Container } from '@mantine/core'
import { NextSeo } from 'next-seo'

import { Favicons } from './Favicon'
// import Footer from './Footer'
import Header from './Header'

const Layout = (props) => {
  return (
    <>
      <NextSeo
        titleTemplate='%s | Tour Tracking'
        defaultTitle='Tour Tracking'
        description="Vacation, Make Friends & Meet New People"
        additionalLinkTags={[...Favicons]}
        {...props}
      />
      <Header />
      <Container
        sx={(theme) => ({
          padding: '24px 30px',
          [theme.fn.largerThan('sm')]: {
            padding: '48px 32px',
          },
        })}
      >
        {props.children}
      </Container>
      {/* <Footer /> */}
    </>
  )
}

export default Layout
