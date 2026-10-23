import { toast } from "sonner";
import postLogoutAccount from "../../../../services/api/MyProfile/AccountActions/postLogoutAccount";
import type { NavigateFunction } from "react-router";
import queryClient from "../../queryClient";
import useAppStore from "../../../zustand/store";
import socket from "../../../socket/socket";

const logoutMutation = (navigate: NavigateFunction) => {
  return {
    mutationFn: postLogoutAccount,
    onMutate: () => {
      useAppStore.getState().logoutUser();
    },
    onSuccess: () => {
      toast.success("Logged out successfully!");
      useAppStore.getState().reset();
      navigate("/", {
        replace: true,
      });
      queryClient.clear();
      socket.disconnect().connect();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  };
};
export default logoutMutation;
