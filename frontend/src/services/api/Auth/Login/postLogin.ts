import customFetch from "../../../../lib/axios/customFetch";
import type { LoginFormType } from "../../../../lib/zod/Auth/loginSchema";
import ENDPOINTS from "../../endpoints";

const postLogin = async (userDatas: LoginFormType) => {
  const response = await customFetch.post(ENDPOINTS.AUTH.LOGIN, userDatas);
  if (typeof response.data === "string") {
    throw new Error(response.data);
  }
  return response.data;
};

export default postLogin;
