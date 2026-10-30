import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const postOnboardingMainPhoto = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await customFetch.post(
    ENDPOINTS.ONBOARDING.SET_PROFILE_PICTURE,
    formData,
  );

  return response;
};

export const postOnboardingAnotherPhotos = async (files: File[]) => {
  const responses = await Promise.all(
    files.map((file) => {
      const formData = new FormData();

      formData.append("file", file);

      return customFetch.post(ENDPOINTS.ONBOARDING.UPLOAD_IMAGE, formData);
    }),
  );

  return responses;
};

export default postOnboardingMainPhoto;
