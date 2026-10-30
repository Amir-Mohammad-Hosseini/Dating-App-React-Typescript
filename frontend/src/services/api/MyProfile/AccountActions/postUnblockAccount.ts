import customFetch from "../../../../lib/axios/customFetch";
import ENDPOINTS from "../../endpoints";

const postUnblockAccount = async (
  accountId: number | string,
) => {
  const response = await customFetch.delete(
    ENDPOINTS.MY_PROFILE.ACCOUNT_ACTIONS.UNBLOCK_ACCOUNT(accountId),
  );

  return response.data;
};

export default postUnblockAccount;