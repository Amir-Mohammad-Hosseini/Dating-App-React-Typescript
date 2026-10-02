import { toast } from "sonner";
import postSignup from "../../../../services/api/Auth/Register/postSignup";
import type { NavigateFunction } from "react-router";

const signupMutation = (navigate: NavigateFunction) => {
  return {
    mutationFn: postSignup,
    onSuccess: () => {
      navigate("/login");
      toast("Signed up successully!");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "An error occurred while sign up";
      toast(message);
    },
  };
};

export default signupMutation;
