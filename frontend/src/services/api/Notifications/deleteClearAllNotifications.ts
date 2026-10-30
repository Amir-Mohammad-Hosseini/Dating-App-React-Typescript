import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";

const deleteClearAllNotifications = async () => {
  const response = await customFetch.delete(
    ENDPOINTS.MY_PROFILE.NOTIFICATIONS.CLEAR_ALL,
  );

  return response.data;
};

export default deleteClearAllNotifications;