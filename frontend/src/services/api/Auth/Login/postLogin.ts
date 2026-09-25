import customFetch from "../../../../lib/axios/customFetch";

const postLogin = async (userDatas: any) => {
  console.log(userDatas);
  const response = await customFetch.post("login", userDatas);
  console.log(response)
  if (typeof response.data === "string") {
    throw new Error(response.data);
  }
  return response.data;
};

export default postLogin;
