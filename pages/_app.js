import { MapProvider } from "react-map-gl";
import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "./redux/store";
import "../styles/mapbox.directions.css";
import { MantineProvider } from "@mantine/core";
import { io } from "socket.io-client";

// global.socket = io("http://localhost:4000", {
global.socket = io("https://2ee2-125-166-126-49.ap.ngrok.io", {
  transports: ["websocket"],
});

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <MapProvider>
          <Component {...pageProps} />
        </MapProvider>
      </MantineProvider>
    </Provider>
  );
}

export default MyApp;
