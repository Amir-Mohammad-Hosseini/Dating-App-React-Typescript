import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const getNotifications = async () => {
  const response = await customFetch(
    ENDPOINTS.MY_PROFILE.NOTIFICATIONS.LIST,
  );

  return response.data;
};

export default getNotifications;