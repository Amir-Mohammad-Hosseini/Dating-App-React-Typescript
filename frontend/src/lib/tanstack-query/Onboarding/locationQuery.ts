import { toast } from "sonner";
import getLocationFromCoordinates from "../../../services/api/Onboarding/getLocationFromCoordinates";

const locationQuery = (
  coordinates: { latitude: number; longitude: number } | null,
) => {
  return {
    queryKey: ["location", coordinates?.latitude, coordinates?.longitude],
    queryFn: () => {
      if (!coordinates) {
        toast.error("Coordinates are not available");
        return;
      }

      return getLocationFromCoordinates(
        coordinates.latitude,
        coordinates.longitude,
      );
    },

    enabled: !!coordinates
  };
};

export default locationQuery;
