import customFetch from "../../../../lib/axios/customFetch";

const getSession = async () => {
  const response = await customFetch("login", { timeout: 5000 });
  return response.data;
};
export default getSession