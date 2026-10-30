import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const getProfileView = async (userId: number | string) => {
  const response = await customFetch(ENDPOINTS.PROFILE_VIEW(userId));

  return response.data;
};

export default getProfileView;
