import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Fav from "../components/Fav";
import { setCurrentLocation } from "../redux/actions/location";
import { useDispatch, useSelector } from "react-redux";
import useSocketIo from "../plugin/socketPlugin";

export default function MapBox() {
  const { longitude, latitude, UserId, RoomId } = useRouter().query;
  const { socket, location } = useSocketIo();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);
  const { currentLocation } = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const mapBoxInit = () => {
    const init = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
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
    socket.emit("coord", {
      longitude,
      latitude,
      UserId,
      RoomId,
    });
    console.log("sending coord");
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
    const geojson = {
      type: "FeatureCollection",
      features: [],
    };

    location.forEach((item) => {
      geojson.features.push({
        type: "Feature",
        properties: {
          message: "Foo",
          iconSize: [60, 60],
        },
        geometry: {
          type: "Point",
          coordinates: [item.longitude, item.latitude],
        },
      });
    });

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
        .addTo(map.current);
    }
  };

  useEffect(() => {
    console.log(location);
    if (!map.current) map.current = mapBoxInit();
  }, [currentLocation, location]);

  return (
    <>
      <div ref={mapContainer} className="map-container" id="map" />
      <button
        id="fly"
        onClick={() => {
          map.current.flyTo({
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
        Load partisipant
      </button>
      <Fav />
    </>
  );
}
