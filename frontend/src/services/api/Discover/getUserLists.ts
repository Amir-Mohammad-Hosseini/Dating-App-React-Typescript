import customFetch from "../../../lib/axios/customFetch";

const getUserLists = async () => {
  const response = await customFetch("browsing/userlists");
  return response.data;
};

export default getUserLists;
