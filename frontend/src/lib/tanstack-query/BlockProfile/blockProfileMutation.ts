import { toast } from "sonner";
import postBlockProfile from "../../../services/api/Block/postBlockProfile";
import type { NavigateFunction } from "react-router";

const blockProfileMutation = (navigate : NavigateFunction) => {
  return {
    mutationFn: postBlockProfile,
    onSuccess: () => {
      toast.success("Profile blocked successfully");
      navigate(-1)
    },
    onError: () => {
      toast.error("Please try again later");
    },
  };
};

export default blockProfileMutation;
