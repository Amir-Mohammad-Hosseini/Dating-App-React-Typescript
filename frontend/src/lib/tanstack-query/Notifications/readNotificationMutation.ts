import type { NavigateFunction } from "react-router";
import patchReadMutation from "../../../services/api/Notifications/patchReadMutation";
import { toast } from "sonner";
import queryClient from "../queryClient";

const readNotificationMutation = (navigate: NavigateFunction) => {
  return {
    mutationFn: patchReadMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
    onError: () => {
      navigate(-1);
      toast.error("Please try again");
    },
  };
};
export default readNotificationMutation;
