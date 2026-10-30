import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const getMatches = async () => {
  return (await customFetch(ENDPOINTS.MATCHES)).data;
};

export default getMatches;
