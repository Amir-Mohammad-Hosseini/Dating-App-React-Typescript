import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const getMyProfile = async () => {
  return (await customFetch(ENDPOINTS.GET_ME)).data;
};

export default getMyProfile;
