import getUserLists from "../../../services/api/Discover/getUserLists";

const userListsQuery = () => {
  return {
    queryKey: ["userlists"],
    queryFn: getUserLists,
  };
};

export default userListsQuery;
