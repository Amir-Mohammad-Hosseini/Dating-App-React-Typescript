import customFetch from "../../../../lib/axios/customFetch";
import ENDPOINTS from "../../endpoints";

const postVerifyEmail = async (username: string, code: string) => {
  const response = await customFetch.post(ENDPOINTS.AUTH.VERIFY_EMAIL, {
    username,
    code,
  });
  if (response.data !== true) {
    throw new Error(
      typeof response.data === "string"
        ? response.data
        : "Verification failed. Please try again.",
    );
  }
  return response.data;
};

export default postVerifyEmail;
