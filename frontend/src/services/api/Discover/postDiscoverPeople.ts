import customFetch from "../../../lib/axios/customFetch";
import type { DiscoverFilters } from "../../../utils/constants/discover";

const postDiscoverPeople = async (filters: DiscoverFilters) => {
  const response = await customFetch.post("browsing/sorted", filters);
  return response.data;
};

export default postDiscoverPeople;
