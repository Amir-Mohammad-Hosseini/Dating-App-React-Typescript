import customFetch from "../../../../lib/axios/customFetch";
import ENDPOINTS from "../../endpoints";

const getSession = async () => {
  const response = await customFetch(ENDPOINTS.AUTH.LOGIN, { timeout: 5000 });
  return response.data;
};
export default getSession