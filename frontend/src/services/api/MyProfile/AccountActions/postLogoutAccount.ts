import customFetch from "../../../../lib/axios/customFetch";

const postLogoutAccount = async () => {
  const response = await customFetch.post("profile/logout");
  return response.data;
};

export default postLogoutAccount;
