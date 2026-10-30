import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const postUnLikeProfile = async (userId: number) => {
  return (await customFetch.post(ENDPOINTS.DISCOVER.UNLIKE_PROFILE(userId)))
    .data;
};

export default postUnLikeProfile;
