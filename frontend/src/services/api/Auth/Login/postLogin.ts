import customFetch from "../../../../lib/axios/customFetch";
import type { LoginFormType } from "../../../../lib/zod/Auth/loginSchema";

const postLogin = async (userDatas: LoginFormType) => {
  console.log(userDatas);
  const response = await customFetch.post("login", userDatas);
  console.log(response)
  if (typeof response.data === "string") {
    throw new Error(response.data);
  }
  return response.data;
};

export default postLogin;
