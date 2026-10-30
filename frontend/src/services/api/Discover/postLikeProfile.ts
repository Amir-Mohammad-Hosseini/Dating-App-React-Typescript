import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const postLikeProfile = async (userId: number) => {
  return (await customFetch.post(ENDPOINTS.DISCOVER.LIKE_PROFILE(userId))).data;
};

export default postLikeProfile;
