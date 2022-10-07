import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useRouter } from "next/router";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { useApolloConfig } from "hooks/useApolloConfig";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export default function App(props) {
  const { Component, pageProps } = props;
  const [queryClient] = useState(() => new QueryClient());
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const router = useRouter();

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const Actions = () => {
    const arr = [];

    links.forEach((item) => {
      const obj = {};

      obj["title"] = item.text;
      obj["onTrigger"] = () => router.push(item.href);

      arr.push(obj);
    });

    return arr;
  };

  return (
    <ApolloProvider client={useApolloConfig}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            fontFamily:
              "Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
            breakpoints: {
              xs: 375,
              sm: 640,
              md: 768,
              lg: 1024,
              xl: 1280,
            },
            primaryColor: "blue",
          }}
        >
          <Global
            styles={() => ({
              html: {
                scrollBehavior: "smooth",
              },
              "::selection": {
                background: "rgb(248, 240, 252, 0.7)",
                color: "#9C36B5",
              },
              "::-webkit-scrollbar": {
                width: 7,
                height: 5,
              },
              "::-webkit-scrollbar-thumb": {
                background: "#9C36B5",
                transition: "0.25s",
                borderRadius: 2,
              },
              "::-webkit-scrollbar-track": {
                background: "0 0",
              },
              "input:-webkit-autofill, input:-webkit-autofill:focus": {
                transition: "background-color 600000s 0s, color 600000s 0s",
              },
            })}
          />
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Component {...pageProps} />
            </Hydrate>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </ApolloProvider>
  );
}
