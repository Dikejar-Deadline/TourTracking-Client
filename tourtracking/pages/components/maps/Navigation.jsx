import { useState } from "react";
import { useMap } from "react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../../redux/actions/location";

export default function NavigateButton() {
  const { currentLocation } = useSelector((state) => state.location);
  const dispatch = useDispatch();
  const { MapA } = useMap();
  const [isFirst, setFirst] = useState(true);
  const success = (pos) => {
    const { longitude, latitude } = pos.coords;
    dispatch(
      setCurrentLocation({
        ...currentLocation,
        longitude,
        latitude,
      })
    );
    // if (isFirst) {
    centerMap();
    // setFirst(false);
    // }
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const getCurrentLocation = () => {
    navigator.geolocation.watchPosition(success, error, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  };

  const centerMap = () => {
    if (MapA) {
      MapA.flyTo({
        center: [currentLocation.longitude, currentLocation.latitude],
      });
    }
  };

  return (
    <div>
      <button onClick={getCurrentLocation}>My location</button>
      <button onClick={centerMap}>Center map</button>
    </div>
  );
}
