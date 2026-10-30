import postDiscoverPeople from "../../../services/api/Discover/postDiscoverPeople";
import type { DiscoverFilters } from "../../../utils/constants/discover";
import DEFAULT_DISCOVER_FILTERS from "../../../utils/constants/discover";
import queryKeys from "../queryKeys";

const discoverPeopleQuery = (filters : DiscoverFilters = DEFAULT_DISCOVER_FILTERS) => {
  return {
    queryKey: queryKeys.discover.people(filters),
    queryFn: () => postDiscoverPeople(filters),
  };
};

export default discoverPeopleQuery;
