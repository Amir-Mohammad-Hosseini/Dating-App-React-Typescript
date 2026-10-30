import customFetch from "../../../../lib/axios/customFetch";
import ENDPOINTS from "../../endpoints";
import type { ChangePasswordDatas } from "../../../../types/myProfile";

const postChangePassword = async (
  passwordDatas: ChangePasswordDatas,
) => {
  const response = await customFetch.post(
    ENDPOINTS.MY_PROFILE.ACCOUNT_ACTIONS.CHANGE_PASSWORD,
    passwordDatas,
  );

  return response.data;
};

export default postChangePassword;