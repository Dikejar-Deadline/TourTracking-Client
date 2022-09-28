import mapboxgl from "mapbox-gl";
import React from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";
import { useSelector } from "react-redux";
import NavigateButton from "./Navigation";

const mapboxAccessToken = "";
const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.483696, 37.833818],
          [-122.483482, 37.833174],
          [-122.483396, 37.8327],
          [-122.483568, 37.832056],
          [-122.48404, 37.831141],
          [-122.48404, 37.830497],
          [-122.483482, 37.82992],
          [-122.483568, 37.829548],
          [-122.48507, 37.829446],
          [-122.4861, 37.828802],
          [-122.486958, 37.82931],
          [-122.487001, 37.830802],
          [-122.487516, 37.831683],
          [-122.488031, 37.832158],
          [-122.488889, 37.832971],
          [-122.489876, 37.832632],
          [-122.490434, 37.832937],
          [-122.49125, 37.832429],
          [-122.491636, 37.832564],
          [-122.492237, 37.833378],
          [-122.493782, 37.833683],
        ],
      },
    },
  ],
};

const layerStyle = {
  id: "route",
  type: "line",
  source: "route",
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
  paint: {
    "line-color": "blue",
    "line-width": 8,
  },
};

export default function MapTrack() {
  const { currentLocation } = useSelector((state) => state.location);

  const check = () => {
    const awal = new mapboxgl.LngLat(-122.4, 37.8);
    const akhir = new mapboxgl.LngLat(
      currentLocation.longitude,
      currentLocation.latitude
    );
    console.log(awal.distanceTo(akhir));
  };

  return (
    <div>
      <Map
        id="MapA"
        initialViewState={currentLocation}
        style={{ width: "100vw", height: 600 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={mapboxAccessToken}
        renderWorldCopies={false}
      >
        <Marker
          longitude={currentLocation.longitude}
          latitude={currentLocation.latitude}
          color="blue"
          onClick={() => {}}
        />
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
      <NavigateButton />
      <button onClick={check}>hitung</button>
    </div>
  );
}
