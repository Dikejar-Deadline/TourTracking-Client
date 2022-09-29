const { default: axios } = require("axios");

const getDirection = async () => {
  const { data } = await axios.get(
    "https://api.mapbox.com/directions/v5/mapbox/driving/117.4405%2C-8.506%3B117.4064%2C-8.4857?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=pk.eyJ1IjoiYTJyaiIsImEiOiJja2g3OW11N3MwNmh1MzBsbDQ4NGVrYWNtIn0.uvhpm1k_6EIRZXyOhHq7QQ"
  );

  const { waypoints, routes } = data;

  const marker0 = waypoints[0].location;
  const marker1 = waypoints[1].location;
  const routesCoords0 = routes[0].geometry.coordinates;
  const routesCoords1 = routes[1].geometry.coordinates;
  console.log(routesCoords0, routesCoords1);
};

getDirection();
