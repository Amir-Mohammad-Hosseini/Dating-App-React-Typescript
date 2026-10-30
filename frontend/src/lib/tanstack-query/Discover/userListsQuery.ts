import getUserLists from "../../../services/api/Discover/getUserLists";
import queryKeys from "../queryKeys";

const userListsQuery = () => {
  return {
    queryKey: queryKeys.discover.usersList,
    queryFn: getUserLists,
  };
};

export default userListsQuery;
