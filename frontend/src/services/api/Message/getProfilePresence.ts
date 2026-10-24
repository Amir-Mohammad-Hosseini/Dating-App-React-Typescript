import customFetch from "../../../lib/axios/customFetch";

const getProfilePresence = async (userId: number | string) => {
  const response = await customFetch(`chat/presence/${userId}`);
  return response.data;
};

export default getProfilePresence;
