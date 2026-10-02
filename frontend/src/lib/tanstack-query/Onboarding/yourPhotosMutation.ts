import { toast } from "sonner";
import postOnboardingMainPhoto, { postOnboardingAnotherPhotos } from "../../../services/api/Onboarding/postOnboardingPhotos";

export const mainPhotoMutation = () => {
  return {
    mutationFn: postOnboardingMainPhoto,
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  };
};
export const otherPhotosMutation = () => {
  return {
    mutationFn: postOnboardingAnotherPhotos,
    onSuccess: () => {
      toast.success("Image uploaded successfully!");
    },
    onError: (error: any) => {
      toast.error(error.message || "An error occurred");
    },
  };
};
