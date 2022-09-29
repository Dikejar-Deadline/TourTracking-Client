import mapboxgl from "mapbox-gl";
import React from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";
import { useSelector } from "react-redux";
import MapGeocoder from "./MapGeocoder";
import NavigateButton from "./Navigation";

const mapboxAccessToken =
  "pk.eyJ1IjoiYTJyaiIsImEiOiJja2g3OW11N3MwNmh1MzBsbDQ4NGVrYWNtIn0.uvhpm1k_6EIRZXyOhHq7QQ";

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [117.438314, -8.509602],
          [117.43559, -8.50885],
          [117.434598, -8.508713],
          [117.435175, -8.505697],
          [117.434919, -8.504916],
          [117.435069, -8.501136],
          [117.433862, -8.499248],
          [117.433573, -8.498559],
          [117.4335, -8.49777],
          [117.432387, -8.497711],
          [117.431441, -8.498397],
          [117.430272, -8.498678],
          [117.430706, -8.502366],
          [117.430436, -8.503094],
          [117.429942, -8.503509],
          [117.428444, -8.503876],
          [117.425511, -8.503966],
          [117.422831, -8.503657],
          [117.419755, -8.503743],
          [117.415819, -8.503544],
          [117.415442, -8.502283],
          [117.414614, -8.500792],
          [117.413659, -8.500002],
          [117.413017, -8.499017],
          [117.412743, -8.49838],
          [117.412781, -8.497654],
          [117.411222, -8.496519],
          [117.410309, -8.496184],
          [117.410157, -8.495853],
          [117.410299, -8.495048],
          [117.411004, -8.494391],
          [117.411054, -8.493238],
          [117.410277, -8.492694],
          [117.40887, -8.490528],
          [117.406338, -8.490225],
          [117.405477, -8.489414],
          [117.405151, -8.487665],
          [117.405424, -8.487199],
          [117.40505, -8.486486],
          [117.405851, -8.485992],
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
    "line-width": 2,
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
      {/* <Map
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
      <NavigateButton /> */}
      <MapGeocoder />
    </div>
  );
}
