import { MapProvider } from "react-map-gl";
import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "./redux/store";
import "../styles/mapbox.directions.css";

// global.XMLHttpRequest = require("xhr2");
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <MapProvider>
        <Component {...pageProps} />
      </MapProvider>
    </Provider>
  );
}

export default MyApp;
