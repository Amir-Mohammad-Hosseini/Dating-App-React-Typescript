import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const getUserLists = async () => {
   return (await customFetch(ENDPOINTS.DISCOVER.USERS_LIST)).data
};

export default getUserLists;
