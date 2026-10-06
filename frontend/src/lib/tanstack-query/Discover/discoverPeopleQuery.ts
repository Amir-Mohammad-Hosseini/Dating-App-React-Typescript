import postDiscoverPeople from "../../../services/api/Discover/postDiscoverPeople";

const discoverPeopleQuery = () => {
  return {
    queryKey: ["discover"],
    queryFn: () => postDiscoverPeople(),
  };
};

export default discoverPeopleQuery;
