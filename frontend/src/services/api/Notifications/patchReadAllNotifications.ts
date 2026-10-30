import customFetch from "../../../lib/axios/customFetch";
import ENDPOINTS from "../endpoints";


const patchReadAllNotifications = async () => {
  const response = await customFetch.patch(
    ENDPOINTS.MY_PROFILE.NOTIFICATIONS.READ_ALL,
  );

  return response.data;
};

export default patchReadAllNotifications;