import { toast } from "sonner";
import postUnblockAccount from "../../../../services/api/MyProfile/AccountActions/postUnblockAccount";
import queryClient from "../../queryClient";

const unblockAccountMutation = () => {
  return {
    mutationFn: postUnblockAccount,
    onSuccess: () => {
      toast.success("Account unblocked successfully!");
      queryClient.invalidateQueries({ queryKey: ["blockedAccounts"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  };
};
export default unblockAccountMutation;
