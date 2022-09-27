import { ColorSchemeProvider, Global, MantineProvider, } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { useRouter } from 'next/router'

export default function App(props) {
  const { Component, pageProps } = props
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const router = useRouter()

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  const Actions = () => {
    const arr = []

    links.forEach((item) => {
      const obj = {}

      obj['title'] = item.text
      obj['onTrigger'] = () => router.push(item.href)

      arr.push(obj)
    })

    return arr
  }
  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} >
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily:
            'Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
          breakpoints: {
            xs: 375,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
          },
        }}
      >
        <Global
          styles={() => ({
            html: {
              scrollBehavior: 'smooth',
            },
            '::selection': {
              background: 'rgb(208, 235, 255, 0.4)',
              color: '#339af0',
            },
            '::-webkit-scrollbar': {
              width: 7,
              height: 5,
            },
            '::-webkit-scrollbar-thumb': {
              background: '#339af0',
              transition: '0.25s',
              borderRadius: 2,
            },
            '::-webkit-scrollbar-track': {
              background: '0 0',
            },
            'input:-webkit-autofill, input:-webkit-autofill:focus': {
              transition:
                'background-color 600000s 0s, color 600000s 0s',
            },
          })}
        />
        <Component {...pageProps} />
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
