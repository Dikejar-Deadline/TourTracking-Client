import {
  CURRENT_LOCATION,
  GET_LOCATION,
  SET_LOCATION,
} from "../types/location";

const initialState = {
  location: [],
  currentLocation: {
    latitude: 37.8,
    longitude: -122.4,
    zoom: 14,
  },
};

export default function locationReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LOCATION:
      return state;
    case SET_LOCATION:
      return {
        ...state,
        location: payload,
      };
    case CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: payload,
      };
    default:
      return state;
  }
}
