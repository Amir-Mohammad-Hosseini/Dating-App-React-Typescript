import customFetch from "../../../lib/axios/customFetch";

const postOnboardingMainPhoto = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await customFetch.post("profile/setprofilepic", formData);
  console.log(response)
  return response;
};

export const postOnboardingAnotherPhotos = async (files: File[]) => {
  const responses = await Promise.all(
    files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      return customFetch.post("profile/imageupload", formData);
    }),
  );
  console.log(responses)
  return responses;
};

export default postOnboardingMainPhoto;
