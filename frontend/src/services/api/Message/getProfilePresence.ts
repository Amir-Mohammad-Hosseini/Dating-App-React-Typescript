import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const getProfilePresence = async (userId: number | string) => {
  const response = await customFetch(ENDPOINTS.MESSAGE.PROFILE_PRECENSE(userId));
  return response.data;
};

export default getProfilePresence;
