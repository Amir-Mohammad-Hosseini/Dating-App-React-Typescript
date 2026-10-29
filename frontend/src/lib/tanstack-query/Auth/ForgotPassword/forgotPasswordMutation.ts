import { toast } from "sonner";
import postForgotPasswordEmail from "../../../../services/api/Auth/ForgotPassword/postForgotPasswordEmail";

const forgotPasswordMutation = (setSentTo: (email: string) => void) => {
  return {
    mutationFn: postForgotPasswordEmail,
    onSuccess: (email: string) => {
      setSentTo(email);
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred");
    },
  };
};

export default forgotPasswordMutation;
