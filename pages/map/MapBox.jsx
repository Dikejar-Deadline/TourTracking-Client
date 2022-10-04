import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Fav from "../components/Fav";
import { setCurrentLocation } from "../redux/actions/location";
import { useDispatch, useSelector } from "react-redux";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        message: "Foo",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [-66.324462, -16.024695],
      },
    },
    {
      type: "Feature",
      properties: {
        message: "Bar",
        iconSize: [50, 50],
      },
      geometry: {
        type: "Point",
        coordinates: [-61.21582, -15.971891],
      },
    },
    {
      type: "Feature",
      properties: {
        message: "Baz",
        iconSize: [40, 40],
      },
      geometry: {
        type: "Point",
        coordinates: [-63.292236, -18.281518],
      },
    },
  ],
};

export default function MapBox() {
  const { longitude, latitude, UserId, RoomId } = useRouter().query;
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const { currentLocation } = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const mapBoxInit = () => {
    const init = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      renderWorldCopies: false,
      accessToken:
        "pk.eyJ1IjoiYTJyaiIsImEiOiJja2g3OW11N3MwNmh1MzBsbDQ4NGVrYWNtIn0.uvhpm1k_6EIRZXyOhHq7QQ",
    });
    return init;
  };

  const success = (pos) => {
    const { longitude, latitude } = pos.coords;
    dispatch(
      setCurrentLocation({
        ...currentLocation,
        longitude,
        latitude,
      })
    );
    const el = document.createElement("div");
    const width = "40";
    const height = "40";
    el.className = "marker";
    el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.backgroundSize = "100%";
    new mapboxgl.Marker(el).setLngLat([longitude, latitude]).addTo(map.current);
    map.current.flyTo({
      center: [longitude, latitude],
      zoom: 14,
    });

    socket.emit("coord", {
      longitude,
      latitude,
      UserId,
      RoomId,
    });
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const myLocation = () => {
    navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  };

  const addMarker = () => {
    for (const marker of geojson.features) {
      // Create a DOM element for each marker.
      const el = document.createElement("div");
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = "marker";
      el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = "100%";

      el.addEventListener("click", () => {
        window.alert(marker.properties.message);
      });

      // Add markers to the map.
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(mapBox);
    }
  };

  useEffect(() => {
    console.log(currentLocation);
    global.mapBox = map.current;
    if (map.current) return; // initialize map only once
    map.current = mapBoxInit();
  }, [currentLocation]);

  return (
    <>
      <div ref={mapContainer} className="map-container" id="map" />
      <button
        id="fly"
        onClick={() => {
          mapBox.flyTo({
            center: [(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100],
            essential: true,
          });
        }}
      >
        fly
      </button>
      <button id="fly" onClick={myLocation}>
        My location
      </button>
      <button id="fly" onClick={addMarker}>
        Add marker
      </button>
      <Fav />
    </>
  );
}
