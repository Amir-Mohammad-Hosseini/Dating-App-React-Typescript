import { toast } from "sonner";
import patchReadAllNotifications from "../../../services/api/Notifications/patchReadAllNotifications";
import queryClient from "../queryClient";

const readAllNotificationsMutation = () => {
  return {
    mutationFn: patchReadAllNotifications,
    onSuccess : () => {
        queryClient.invalidateQueries({
            queryKey : ["notifications"]
        })
    },
    onError: () => {
      toast.error("Please try again");
    },
  };
};

export default readAllNotificationsMutation;
