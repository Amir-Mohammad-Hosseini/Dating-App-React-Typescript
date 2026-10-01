import { toast } from "sonner";
import postOnboardingDatas from "../../../services/api/Onboarding/postOnboardingDatas";
import type { NavigateFunction } from "react-router";
import useAppStore from "../../zustand/store";

const doneMutation = (navigate: NavigateFunction) => {
  return {
    mutationFn: postOnboardingDatas,
    onSuccess: () => {
      toast.success("Profile created successfully!");
      useAppStore.getState().markProfileComplete();
      navigate("/discover");
    },
    onError: (error: any) => {
      toast.error(error?.message || "An error occurred");
    },
  };
};

export default doneMutation;
