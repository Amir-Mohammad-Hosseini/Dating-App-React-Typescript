import { toast } from "sonner";
import getLocationFromCoordinates from "../../../services/api/Onboarding/getLocationFromCoordinates";
import queryKeys from "../queryKeys";

const locationQuery = (
  coordinates: { latitude: number; longitude: number } | null,
) => {
  return {
    queryKey: queryKeys.onboarding.location(coordinates),
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
