import axios from "axios";
import ENDPOINTS from "../endpoints";

const getLocationFromCoordinates = async (
  latitude: number,
  longitude: number,
) => {
  const response = await axios.get(
    ENDPOINTS.GEOCODING.REVERSE(latitude, longitude),
  );

  return response.data;
};

export default getLocationFromCoordinates;