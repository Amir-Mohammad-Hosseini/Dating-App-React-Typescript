import { toast } from "sonner";
import getCoordinates from "../../../services/api/Onboarding/getCoordinates";

const locationMutation = (setCoorditates : Function) => {
  return {
    mutationFn: getCoordinates,
    onSuccess: (data: any) => {
      setCoorditates({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  };
};

export default locationMutation;
