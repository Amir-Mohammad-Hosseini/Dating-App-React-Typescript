import getProfileView from "../../../services/api/ProfileView/getProfileView";
import queryKeys from "../queryKeys";

const profileViewQuery = (userId: number | string) => {
  return {
    queryKey: queryKeys.profileView.all(userId),
    queryFn: () => getProfileView(userId),
  };
};

export default profileViewQuery;
