import {
  CURRENT_LOCATION,
  GET_LOCATION,
  SET_LOCATION,
} from "../types/location";

export const getLocation = () => ({
  type: GET_LOCATION,
});

export const setLocation = (locations) => ({
  type: SET_LOCATION,
  payload: locations,
});

export const setCurrentLocation = (location) => ({
  type: CURRENT_LOCATION,
  payload: location,
});
