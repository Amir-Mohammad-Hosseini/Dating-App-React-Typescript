import type { NavigateFunction } from "react-router";
import deleteAccount from "../../../../services/api/MyProfile/AccountActions/deleteAccount";
import queryClient from "../../queryClient";
import { toast } from "sonner";
import useAppStore from "../../../zustand/store";

const deleteAccountMutation = (navigate: NavigateFunction) => {
  return {
    mutationFn: deleteAccount,
    onSuccess: () => {
      toast.success("Account deleted successfully!");
      useAppStore.getState().reset();
      navigate("/", {
        replace: true,
      });
      queryClient.clear();
    },
  };
};

export default deleteAccountMutation;
