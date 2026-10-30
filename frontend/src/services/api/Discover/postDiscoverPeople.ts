import customFetch from "../../../lib/axios/customFetch";
import type { DiscoverFilters } from "../../../utils/constants/discover";
import ENDPOINTS from "../endpoints";

const postDiscoverPeople = async (filters: DiscoverFilters) => {
   return (await customFetch.post(ENDPOINTS.DISCOVER.DISCOVER_PEOPLE, filters)).data
};

export default postDiscoverPeople;
