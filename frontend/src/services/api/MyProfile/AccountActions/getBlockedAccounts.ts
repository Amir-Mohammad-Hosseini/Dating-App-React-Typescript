import customFetch from "../../../../lib/axios/customFetch";
import ENDPOINTS from "../../endpoints";

const getBlockedAccounts = async () => {
  const response = await customFetch(
    ENDPOINTS.MY_PROFILE.ACCOUNT_ACTIONS.BLOCKED_ACCOUNTS,
  );

  return response.data;
};

export default getBlockedAccounts;