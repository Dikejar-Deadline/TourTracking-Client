import { MapProvider } from "react-map-gl";
import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "./redux/store";
import "../styles/mapbox.directions.css";
import { MantineProvider } from "@mantine/core";

// global.XMLHttpRequest = require("xhr2");
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
