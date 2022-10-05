import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Fav from "../components/Fav";
import { setCurrentLocation } from "../redux/actions/location";
import { useDispatch, useSelector } from "react-redux";
import useSocketIo from "../plugin/socketPlugin";

export default function MapBox() {
  const { currentLocation } = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const { longitude, latitude, UserId, RoomId } = useRouter().query;
  const { socket, location } = useSocketIo();
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);

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

  const flyToMyLocation = () => {
    myLocation();
    map.current.flyTo({
      center: [currentLocation.longitude, currentLocation.latitude],
      zoom: 14,
    });
  };

  const addMarker = () => {
    const geojson = {
      type: "FeatureCollection",
      features: [],
    };
    geojson.features.push({
      type: "Feature",
      properties: {
        message: "Place",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
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

    const currentMarker = document.querySelectorAll(".marker");
    currentMarker.forEach((marker) => marker.remove());

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
    if (!map.current) map.current = mapBoxInit();
    addMarker();
  }, [currentLocation, location]);

  return (
    <>
      <div ref={mapContainer} className="map-container" id="map" />
      <button id="fly" onClick={flyToMyLocation}>
        My location
      </button>
      {/* <button id="fly" onClick={addMarker}>
        Load partisipant
      </button> */}
      <Fav />
    </>
  );
}
