import React, { Component, useState } from "react";
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGL from "react-map-gl";

const mapAccess = {
  mapboxApiAccessToken:
    "pk.eyJ1IjoiYTJyaiIsImEiOiJja2g3OW11N3MwNmh1MzBsbDQ4NGVrYWNtIn0.uvhpm1k_6EIRZXyOhHq7QQ",
};

const mapStyle = {
  width: "100",
  height: 600,
};

const queryParams = {
  country: "id",
};

export default function MapGeocoder() {
  const [viewport, setViewport] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  const onSelected = (viewport, item) => {
    setViewport({ viewport });
    console.log("Selected: ", item);
  };

  return (
    <div>
      <Geocoder
        {...mapAccess}
        onSelected={onSelected}
        viewport={viewport}
        hideOnSelect={true}
        queryParams={queryParams}
      />
    </div>
  );
}
