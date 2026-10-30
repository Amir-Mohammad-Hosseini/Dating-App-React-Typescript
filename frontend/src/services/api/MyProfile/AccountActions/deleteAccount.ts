import customFetch from "../../../../lib/axios/customFetch";
import ENDPOINTS from "../../endpoints";

const deleteAccount = async (password: string) => {
  const response = await customFetch.delete(ENDPOINTS.MY_PROFILE.ACCOUNT_ACTIONS.DELETE_USER, {
    data: {
      password,
    },
  });
  return response.data;
};

export default deleteAccount;
