import { toast } from "sonner";
import postResetPassword from "../../../../services/api/Auth/ResetPassword/postResetPassword";
import type { NavigateFunction } from "react-router";

const resetPasswordMutation = (navigate: NavigateFunction) => {
  return {
    mutationFn: postResetPassword,
    onSuccess: () => {
      toast.success("Password updated. You can log in now.");
      navigate("/login", { replace: true });
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  };
};

export default resetPasswordMutation;
