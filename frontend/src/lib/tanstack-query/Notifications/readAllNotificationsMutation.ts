import { toast } from "sonner";
import patchRealAllNotifications from "../../../services/api/Notifications/patchRealAllNotifications";
import queryClient from "../queryClient";

const readAllNotificationsMutation = () => {
  return {
    mutationFn: patchRealAllNotifications,
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
