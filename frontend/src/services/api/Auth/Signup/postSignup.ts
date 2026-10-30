import customFetch from "../../../../lib/axios/customFetch";
import type { SignupFormType } from "../../../../lib/zod/Auth/signupSchema";
import ENDPOINTS from "../../endpoints";

const postSignup = async (userDatas: SignupFormType) => {
  return (await customFetch.post(ENDPOINTS.AUTH.SIGN_UP, userDatas)).data
};

export default postSignup;
