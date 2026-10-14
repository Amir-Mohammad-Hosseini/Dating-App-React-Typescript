import customFetch from "../../../../lib/axios/customFetch";

const deleteAccount = async (password: string) => {
  const response = await customFetch.delete("profile/deleteuser", {
    data: {
      password,
    },
  });
  return response.data;
};

export default deleteAccount;
