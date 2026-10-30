import customFetch from "../../../../lib/axios/customFetch";
import ENDPOINTS from "../../endpoints";

const postLogoutAccount = async () => {
  const response = await customFetch.post(
    ENDPOINTS.MY_PROFILE.ACCOUNT_ACTIONS.LOGOUT,
  );

  return response.data;
};

export default postLogoutAccount;